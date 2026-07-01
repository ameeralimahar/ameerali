import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_CONTEXT = `You are an AI assistant for Ameer Ali's portfolio website. Be concise, helpful and friendly.

About Ameer Ali:
- Software Engineer at SIBA Testing Services (STS), Sukkur, Pakistan
- Specializes in Full-Stack Web Development, AI/ML, Computer Vision, and Cloud Infrastructure
- Systems he built serve 3M+ exam candidates
- Open to remote opportunities

Key Projects:
1. Automated OMR Grading System — Computer vision pipeline for exam sheets (Python, OpenCV, AWS)
2. ID Document Verification Pipeline — End-to-end identity verification (Python, OpenCV, PyTorch)
3. Enterprise Admin Portal — Centralized admin platform (Angular, Node.js, Express, SQL Server)
4. Candidate Portal — Public-facing exam portal at apply.sts.net.pk (Angular, Node.js, SQL Server)
5. SMS Communication Portal — Enterprise messaging with M3Tech SOAP API
6. AWS SES Email Delivery — Serverless bulk email pipeline (AWS Lambda, SES)
7. Exam Result Analyzer — PDF parsing and data visualization (Python, pdfplumber)
8. Book Recommendation System — ML-based recommendations (Python, Flask, Scikit-learn)
9. UNI-SELECT — University recommendation platform (Final Year Project)
10. MAHAR GYM APP — MERN stack fitness app
11. Robbers Mewen — Luxury e-commerce venture (Next.js)

Tech Stack: React, Next.js, Angular, TypeScript, Node.js, Express, Python, Flask, OpenCV, PyTorch, Scikit-learn, AWS Lambda, AWS SES, S3, Supabase, SQL Server, MongoDB

Contact: ameerali.bscssef20@iba-suk.edu.pk
GitHub: https://github.com/ameeralimahar
LinkedIn: https://www.linkedin.com/in/ameeralimahar

Answer only about Ameer Ali's portfolio, skills, projects, experience, and how to contact him. If asked unrelated questions, politely redirect to portfolio topics. Keep responses under 150 words.`;

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "your-gemini-api-key-here") {
    return NextResponse.json({
      reply: "AI chat is not configured yet. Please reach out to Ameer directly at ameerali.bscssef20@iba-suk.edu.pk",
    });
  }

  try {
    const { message } = await request.json();
    if (!message?.trim()) {
      return NextResponse.json({ reply: "Please send a message." });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(`${SYSTEM_CONTEXT}\n\nUser: ${message}`);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Gemini error:", err);
    return NextResponse.json({ reply: "Sorry, I'm having trouble right now. Please try again later." });
  }
}
