import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@/lib/supabase/server";
import { isAuthed } from "@/lib/adminAuth";

export async function POST(request: Request) {
  // This route was previously missing an auth check entirely — anyone
  // who found this endpoint could burn the Gemini API quota and insert
  // posts directly into the live database with zero credentials.
  if (!isAuthed()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "your-gemini-api-key-here") {
    return NextResponse.json({ error: "GEMINI_API_KEY not configured" }, { status: 500 });
  }

  const { topic } = await request.json();
  if (!topic?.trim()) {
    return NextResponse.json({ error: "Topic is required" }, { status: 400 });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Write a detailed, technical blog post for a software engineer's portfolio about: "${topic}"

The post should be from the perspective of Ameer Ali, a Software Engineer who works on production systems at scale (OMR grading, AI/ML pipelines, web portals serving millions of exam candidates).

Format the output as JSON with these exact fields:
{
  "title": "compelling post title",
  "excerpt": "2-3 sentence summary",
  "body": "full HTML post content with <h2>, <p>, <code>, <ul>, <li> tags"
}

Make it practical, insightful, and around 600-800 words. Include real technical details. The tone should be experienced and direct, not marketing-speak.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON in response");

    const postData = JSON.parse(jsonMatch[0]);

    // Generate slug
    const slug = postData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 80);

    const supabase = createClient();
    const { data, error } = await supabase
      .from("posts")
      .insert({
        title: postData.title,
        slug: `${slug}-${Date.now()}`,
        excerpt: postData.excerpt,
        body: postData.body,
        status: "draft",
      })
      .select("id")
      .single();

    if (error) throw error;

    return NextResponse.json({ id: data.id });
  } catch (err) {
    console.error("Generate post error:", err);
    return NextResponse.json({ error: "Failed to generate post" }, { status: 500 });
  }
}
