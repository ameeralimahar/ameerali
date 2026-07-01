-- ============================================================
-- Ameer Ali Portfolio — Full Content Seed
-- Run AFTER schema.sql in Supabase SQL Editor
-- Safe to re-run — uses ON CONFLICT DO UPDATE
-- ============================================================

-- Site settings
INSERT INTO site_settings (id, hero_heading, hero_subheading, email, github_url, linkedin_url, resume_url)
VALUES (
  1,
  'I build systems that grade, verify, and scale — to millions of people.',
  'AI/ML-focused Software Engineer with production experience building computer vision and automation pipelines deployed at scale.',
  'ameerali.bscssef20@iba-suk.edu.pk',
  'https://github.com/ameeralimahar',
  'https://www.linkedin.com/in/ameeralimahar',
  '/resume.pdf'
)
ON CONFLICT (id) DO UPDATE SET
  hero_heading = EXCLUDED.hero_heading,
  hero_subheading = EXCLUDED.hero_subheading,
  email = EXCLUDED.email,
  github_url = EXCLUDED.github_url,
  linkedin_url = EXCLUDED.linkedin_url,
  resume_url = EXCLUDED.resume_url,
  updated_at = now();

-- ============================================================
-- PROJECTS
-- ============================================================
INSERT INTO projects (title, slug, tagline, description, category, tech_stack, featured, display_order, status, source)
VALUES
(
  'Automated OMR Grading System',
  'omr-grading-system',
  'Computer-vision pipeline that grades exam sheets for 3M+ candidates.',
  'Built to remove the manual grading bottleneck for large exam cohorts. Automatically detects, aligns, and scores bubble-sheet answer forms from scanned images using classical image-processing techniques — thresholding, contour detection, perspective correction — with confidence-based validation to flag ambiguous marks for human review. Deployed as part of the exam-processing pipeline at SIBA Testing Services, processing results for large candidate cohorts per testing cycle. Handles noisy or misaligned scans gracefully without silently guessing.',
  'AI-ML',
  ARRAY['Python', 'OpenCV', 'NumPy', 'AWS S3', 'AWS RDS'],
  true, 1, 'published', 'manual'
),
(
  'ID Document Verification Pipeline',
  'id-document-verification',
  'End-to-end identity document verification for 3M+ exam candidates.',
  'An end-to-end verification pipeline that checks candidate-submitted identity documents (CNIC and similar national ID formats) against submitted profile data. Built Python/OpenCV image-processing pipelines handling deskewing, glare/noise reduction, OCR text extraction, and ML-based field validation. Flags mismatches or low-confidence extractions for manual review. Wrote Python/boto3 pipelines to query SQL Server (AWS RDS) and sync candidate documents to/from AWS S3, supporting the verification pipeline end-to-end.',
  'AI-ML',
  ARRAY['Python', 'OpenCV', 'OCR', 'AWS S3', 'AWS RDS', 'boto3'],
  true, 2, 'published', 'manual'
),
(
  'Enterprise Admin Portal',
  'enterprise-admin-portal',
  'Centralized administration platform for organizational management.',
  'A production Angular + Node.js/Express application serving as the operational backbone for managing candidates, staff, applications, and reporting across the organization. Features role-based authentication and authorization, application lifecycle management, configurable dashboards, and analytics/reporting views used by administrative staff daily. Built and maintained as one of the core systems at SIBA Testing Services.',
  'Full-Stack',
  ARRAY['Angular', 'Node.js', 'Express', 'SQL Server', 'AWS RDS'],
  true, 3, 'published', 'manual'
),
(
  'Candidate Portal',
  'candidate-portal',
  'Public exam portal at apply.sts.net.pk — registration to result tracking.',
  'A public-facing portal where exam candidates register, submit applications, manage their profile, upload required documents, and track application status in real time. Built to handle high-traffic registration windows without degrading under load. Candidates can track exactly where their application stands through the entire lifecycle — from submission to verification to result.',
  'Full-Stack',
  ARRAY['Angular', 'Node.js', 'SQL Server', 'AWS'],
  true, 4, 'published', 'manual'
),
(
  'SMS Communication Portal',
  'sms-communication-portal',
  'Enterprise bulk messaging platform integrated with M3Tech SOAP API.',
  'Built to give administrative staff a self-service tool for candidate communication. Supports single and bulk SMS sends, delivery status tracking, reusable message templates, and contact-group management. Started as a browser-based prototype to validate the M3Tech SOAP API integration, then specced and rebuilt as a production Angular + Node.js/Express application.',
  'Full-Stack',
  ARRAY['Angular', 'Node.js', 'SOAP API', 'SQL Server'],
  true, 5, 'published', 'manual'
),
(
  'AWS SES Email Delivery System',
  'aws-ses-email-system',
  'Serverless bulk email pipeline with delivery tracking via AWS Lambda + SES.',
  'A serverless email system built on AWS Lambda that sends HTML emails with image attachments via AWS SES SMTP, used for candidate communications at scale. Involved iterative debugging through the Lambda console — resolving SES-specific SMTP credential generation (distinct from IAM keys), environment variable configuration, function timeout tuning, and correct SMTP call sequencing. Sends from the institution verified domain via the ap-southeast-1 SES endpoint.',
  'Cloud',
  ARRAY['Node.js', 'AWS Lambda', 'AWS SES', 'boto3'],
  true, 6, 'published', 'manual'
),
(
  'Document Download Portal',
  'document-download-portal',
  'Secure document management and distribution platform.',
  'A secure portal for managing and distributing candidate documents — handling file upload, storage, authenticated access control, and search. Ensures sensitive documents are never exposed without proper authorization. Built with Angular frontend and Node.js/SQL Server backend.',
  'Full-Stack',
  ARRAY['Angular', 'Node.js', 'SQL Server'],
  false, 7, 'published', 'manual'
),
(
  'Exam Result Analyzer',
  'exam-result-analyzer',
  'Turned a large unstructured PDF result list into interactive, searchable data.',
  'For the Junior Science Teacher (BPS-14) post under SE&LD Sindh, exam results were only available as a large, unstructured PDF. Built a parsing pipeline using pdfplumber to extract structured district-level candidate data, then built an interactive table with charts — turning a static, hard-to-search document into something administrators could actually query and analyze.',
  'Data',
  ARRAY['Python', 'pdfplumber', 'Pandas', 'Data Visualization'],
  true, 8, 'published', 'manual'
),
(
  'Book Recommendation System',
  'book-recommendation-system',
  'AI-powered recommendations using popularity-based and collaborative filtering.',
  'A recommendation engine suggesting books through two complementary approaches: a popularity-based model for cold-start users with no history, and collaborative filtering for personalized suggestions based on similar users ratings. Served through a Flask application with a simple search/browse interface.',
  'AI-ML',
  ARRAY['Python', 'Flask', 'Scikit-Learn', 'Pandas', 'Machine Learning'],
  false, 9, 'published', 'manual'
),
(
  'UNI-SELECT',
  'uni-select',
  'ML-driven university recommendation platform — Final Year Project.',
  'A machine-learning-driven university recommendation platform built as Final Year Project, helping students identify suitable universities based on their academic profile and preferences, with search and filtering to narrow results.',
  'AI-ML',
  ARRAY['Python', 'Machine Learning', 'Scikit-Learn', 'Web Development'],
  false, 10, 'published', 'manual'
),
(
  'MAHAR GYM APP',
  'mahar-gym-app',
  'Modern MERN-stack fitness tracking application.',
  'A fitness tracking application built on the MERN stack, featuring structured workout programs, a responsive UI, and user authentication — built to explore full end-to-end MERN development outside of the Angular/SQL Server stack used at work.',
  'Full-Stack',
  ARRAY['MongoDB', 'Express.js', 'React', 'Node.js'],
  false, 11, 'published', 'manual'
),
(
  'Robbers Mewen',
  'robbers-mewen',
  'Bootstrapped luxury e-commerce venture — perfumes, wallets, high-end goods.',
  'A self-funded luxury e-commerce venture focused on high-end goods such as perfumes and wallets, built and run end-to-end — from brand identity and logo design through storefront build. An ongoing project exploring product, brand, and e-commerce outside of a pure engineering role.',
  'Venture',
  ARRAY['Next.js', 'E-commerce', 'Branding'],
  false, 12, 'published', 'manual'
)
ON CONFLICT (slug) DO UPDATE SET
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  tech_stack = EXCLUDED.tech_stack,
  featured = EXCLUDED.featured,
  display_order = EXCLUDED.display_order,
  status = EXCLUDED.status;

-- ============================================================
-- CERTIFICATIONS
-- ============================================================
INSERT INTO certifications (title, issuer, issue_date, display_order, status)
VALUES
  ('Model Context Protocol (MCP)', 'Scrimba', NULL, 1, 'published'),
  ('AI Engineering Path', 'Scrimba', NULL, 2, 'published'),
  ('Supervised Machine Learning: Regression and Classification', 'DeepLearning.AI & Stanford University (Coursera)', NULL, 3, 'published'),
  ('Prompt Engineering for Generative AI', 'Google', NULL, 4, 'published')
ON CONFLICT DO NOTHING;

-- ============================================================
-- SAMPLE POST (dummy with cover image)
-- ============================================================
INSERT INTO posts (title, slug, excerpt, body, cover_image_url, status, published_at)
VALUES (
  'How I Built an Automated OMR Grading System with OpenCV',
  'omr-grading-system-opencv',
  'A deep dive into building a computer vision pipeline that automatically grades bubble-sheet answer forms for millions of exam candidates — handling real-world scan quality issues, misalignment, and ambiguous marks.',
  '<h2>The Problem</h2>
<p>At SIBA Testing Services, we process exams for over 3 million candidates. Every exam cycle, hundreds of thousands of printed answer sheets needed to be manually graded — a slow, expensive, and error-prone process. I was tasked with automating it.</p>

<h2>The Approach</h2>
<p>The solution needed to handle real-world scan quality: skewed sheets, uneven lighting, low-resolution scans, and candidates who marked answers ambiguously. Classical computer vision with OpenCV turned out to be the right tool — it is fast, deterministic, and interpretable when things go wrong.</p>

<h2>Pipeline Overview</h2>
<p>The pipeline works in four stages:</p>
<ul>
  <li><strong>Pre-processing:</strong> Grayscale conversion, Gaussian blur for noise reduction, adaptive thresholding to handle uneven lighting.</li>
  <li><strong>Sheet detection & alignment:</strong> Contour detection to find the answer sheet boundary, then perspective correction using a four-point transform to get a top-down view regardless of scan angle.</li>
  <li><strong>Bubble detection:</strong> Find all bubble locations using Hough Circle Transform or contour area filtering, then map each bubble to its question/option grid position.</li>
  <li><strong>Scoring:</strong> For each question, measure the filled pixel ratio inside each bubble. The bubble with the highest ratio above a threshold is marked as the selected answer. If no bubble crosses the threshold, or two bubbles are close, the question is flagged for manual review.</li>
</ul>

<h2>The Confidence Layer</h2>
<p>The most important design decision was adding a confidence threshold rather than silently picking the best guess. When the difference between the top two bubbles is small — meaning the candidate may have erased or double-marked — the system flags the answer for human review instead of auto-scoring it. This matters in high-stakes exams.</p>

<pre><code>def score_question(bubble_fills, threshold=0.5, confidence_gap=0.15):
    sorted_fills = sorted(enumerate(bubble_fills), key=lambda x: x[1], reverse=True)
    best_idx, best_fill = sorted_fills[0]
    second_fill = sorted_fills[1][1] if len(sorted_fills) > 1 else 0

    if best_fill < threshold:
        return None, "unanswered"
    if (best_fill - second_fill) < confidence_gap:
        return None, "ambiguous"
    return best_idx, "confident"
</code></pre>

<h2>Results</h2>
<p>The pipeline processes a full answer sheet in under 200ms on a standard AWS EC2 instance. Accuracy on clean scans exceeds 99.5%. On real-world production scans (which are often imperfect), about 2-3% of questions get flagged for manual review — which is far better than manually reviewing everything.</p>

<h2>Lessons Learned</h2>
<p>The hardest part was not the algorithm — it was handling the long tail of edge cases from production scans. Sheets that are torn, crumpled, or scanned at extreme angles. Candidates who use gel pens that bleed through. These do not show up in test data but they absolutely show up at 3am during exam processing.</p>
<p>The solution: build a robust flagging system and keep humans in the loop for uncertain cases rather than trying to handle every edge case algorithmically.</p>',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80',
  'published',
  now()
)
ON CONFLICT (slug) DO NOTHING;
