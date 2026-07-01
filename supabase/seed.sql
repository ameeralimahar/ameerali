-- ============================================================
-- Seed data — run AFTER schema.sql in the Supabase SQL editor.
-- This is real placeholder content based on Ameer's actual work.
-- Edit freely in the admin dashboard once it's built (Phase 2) —
-- or edit these rows directly in the Supabase Table Editor now.
-- ============================================================

insert into projects (title, slug, tagline, description, category, tech_stack, featured, display_order, status)
values
(
  'Automated OMR Grading System',
  'omr-grading-system',
  'A computer-vision pipeline that grades exam sheets at scale.',
  'Removes manual grading bottlenecks for large exam cohorts by automatically detecting and scoring bubble sheets from scanned images.',
  'AI-ML',
  array['Python', 'OpenCV', 'AWS'],
  true, 1, 'draft'
),
(
  'ID Document Verification Pipeline',
  'id-document-verification',
  'Automated identity-document verification for exam candidates.',
  'Combines OCR, image preprocessing, and ML-based validation to verify candidate identity documents at scale.',
  'AI-ML',
  array['Python', 'OpenCV', 'PyTorch'],
  true, 2, 'draft'
),
(
  'Enterprise Admin Portal',
  'enterprise-admin-portal',
  'Centralized administration platform for organizational management.',
  'User management, role-based authentication, application management, reports & analytics, and workflow management for a multi-thousand-user institution.',
  'Full-Stack',
  array['Angular', 'Node.js', 'Express', 'SQL Server'],
  true, 3, 'draft'
),
(
  'Candidate Portal',
  'candidate-portal',
  'Full recruitment and candidate management system.',
  'Candidate registration, online application, profile management, document upload, and status tracking.',
  'Full-Stack',
  array['Angular', 'Node.js', 'SQL Server'],
  true, 4, 'draft'
),
(
  'SMS Communication Portal',
  'sms-communication-portal',
  'Enterprise messaging platform integrated with M3Tech SOAP API.',
  'Single and bulk SMS with delivery tracking, template management, and contact groups.',
  'Full-Stack',
  array['Angular', 'Node.js', 'SOAP API', 'SQL Server'],
  true, 5, 'draft'
),
(
  'AWS SES Email Delivery System',
  'aws-ses-email-system',
  'Serverless bulk email pipeline with delivery tracking.',
  'HTML email with attachments, queue management, and delivery tracking, deployed on AWS Lambda.',
  'Cloud',
  array['Node.js', 'AWS Lambda', 'SES'],
  true, 6, 'draft'
),
(
  'Exam Result Analyzer',
  'exam-result-analyzer',
  'Parsed a large multi-district PDF result list into structured, interactive data.',
  'Extracted district-level candidate data from a large PDF result list (Junior Science Teacher BPS-14, SE&LD Sindh) and presented it in an interactive table with charts.',
  'Data',
  array['Python', 'pdfplumber', 'Data Viz'],
  true, 7, 'draft'
),
(
  'Book Recommendation System',
  'book-recommendation-system',
  'AI-powered recommendation engine using popularity-based and collaborative filtering.',
  'Suggests books to users via a Flask app backed by a popularity-based and collaborative-filtering recommendation model.',
  'AI-ML',
  array['Python', 'Flask', 'Machine Learning', 'Pandas'],
  false, 8, 'draft'
),
(
  'UNI-SELECT',
  'uni-select',
  'University recommendation portal — Final Year Project.',
  'ML-based university recommendation and student guidance platform with search and filtering.',
  'AI-ML',
  array['Python', 'Machine Learning', 'Web Development'],
  false, 9, 'draft'
),
(
  'MAHAR GYM APP',
  'mahar-gym-app',
  'Modern MERN-stack fitness application.',
  'Workout programs, responsive UI, and authentication for a fitness tracking application.',
  'Full-Stack',
  array['MongoDB', 'Express.js', 'React', 'Node.js'],
  false, 10, 'draft'
),
(
  'Robbers Mewen',
  'robbers-mewen',
  'Bootstrapped luxury e-commerce venture.',
  'A luxury e-commerce venture focused on high-end goods such as perfumes and wallets, built end-to-end from brand identity to storefront.',
  'Venture',
  array['E-commerce', 'Brand'],
  false, 11, 'draft'
)
on conflict (slug) do nothing;

insert into certifications (title, issuer, display_order, status)
values
('Machine Learning Specialization — Supervised Machine Learning: Regression and Classification', 'DeepLearning.AI & Stanford University (Coursera)', 1, 'published')
on conflict do nothing;

-- Note: all projects above are seeded as status = 'draft' on purpose.
-- Review each one, correct/expand the description, add demo_url / repo_url /
-- cover_image_url, THEN flip status to 'published' — either directly in the
-- Supabase Table Editor for now, or via the admin dashboard once Phase 2 is built.
