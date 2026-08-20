import { ExamDefinition, MockProduct } from "@/lib/types";

// Per-exam configuration. Every exam differs in more than its name — score
// scale, section count, timing, and question style all vary — so each entry
// carries its own display data instead of a single generic template.
export interface ExamConfigExtra {
  format: string; // e.g. "Academic English", "Computer-Based"
  scaleLabel: string; // e.g. "Score 0–120", "Band 0–9"
  skillsLabel: string; // e.g. "4 Skills"
  fullDuration: string; // e.g. "~3 hours"
  questionTypes: string[];
}

export const EXAM_EXTRA: Record<string, ExamConfigExtra> = {
  toefl: {
    format: "Academic English · Internet-Based",
    scaleLabel: "Score 0–120",
    skillsLabel: "4 Skills",
    fullDuration: "~2 hrs",
    questionTypes: ["Integrated Reading", "Campus Conversations", "Independent Speaking", "Integrated Writing"],
  },
  "ielts-academic": {
    format: "Academic · Paper or Computer",
    scaleLabel: "Band 0–9",
    skillsLabel: "4 Skills",
    fullDuration: "~2 hrs 45 min",
    questionTypes: ["Academic Passages", "Matching & Diagrams", "Face-to-face Style Speaking", "Task 1 Report + Task 2 Essay"],
  },
  "ielts-general": {
    format: "General Training",
    scaleLabel: "Band 0–9",
    skillsLabel: "4 Skills",
    fullDuration: "~2 hrs 45 min",
    questionTypes: ["Everyday Texts", "Workplace Listening", "Everyday Speaking Topics", "Letter + Essay Writing"],
  },
  pte: {
    format: "Academic · Computer-Based",
    scaleLabel: "Score 10–90",
    skillsLabel: "3 Parts, 4 Skills",
    fullDuration: "~2 hrs",
    questionTypes: ["Read Aloud", "Repeat Sentence", "Describe Image", "Summarize Written Text"],
  },
  duolingo: {
    format: "Adaptive · At-Home",
    scaleLabel: "Score 10–160",
    skillsLabel: "Adaptive Format",
    fullDuration: "~1 hr",
    questionTypes: ["Adaptive Reading/Listening", "Yes/No Vocabulary", "Video Interview Speaking", "Interactive Writing"],
  },
  teps: {
    format: "Korean-Standard English",
    scaleLabel: "Score 0–600",
    skillsLabel: "4 Skills",
    fullDuration: "~3 hrs",
    questionTypes: ["Grammar Accuracy", "Listening Dialogues", "Reading Comprehension", "Long Passage Reading"],
  },
  toeic: {
    format: "Business & Workplace English",
    scaleLabel: "Score 10–990",
    skillsLabel: "2 Skills",
    fullDuration: "~2 hrs",
    questionTypes: ["Photographs", "Listening Dialogues", "Incomplete Sentences", "Reading Comprehension"],
  },
  oet: {
    format: "Healthcare English",
    scaleLabel: "Grade A–E",
    skillsLabel: "4 Skills",
    fullDuration: "~3 hrs",
    questionTypes: ["Clinical Consultations", "Healthcare Extracts", "Role-play Speaking", "Case Note Writing"],
  },
};

export const EXAMS: Record<string, ExamDefinition> = {
  toefl: {
    id: "toefl",
    name: "TOEFL iBT",
    fullName: "TOEFL iBT Exam-style Mock",
    scoreMax: 120,
    scoreLabel: "Score",
    sections: ["reading", "listening", "speaking", "writing"],
  },
  "ielts-academic": {
    id: "ielts-academic",
    name: "IELTS Academic",
    fullName: "IELTS Academic Exam-style Mock",
    scoreMax: 9,
    scoreLabel: "Band",
    sections: ["reading", "listening", "speaking", "writing"],
  },
  "ielts-general": {
    id: "ielts-general",
    name: "IELTS General",
    fullName: "IELTS General Training Mock",
    scoreMax: 9,
    scoreLabel: "Band",
    sections: ["reading", "listening", "speaking", "writing"],
  },
  pte: {
    id: "pte",
    name: "PTE Academic",
    fullName: "PTE Academic Exam-style Mock",
    scoreMax: 90,
    scoreLabel: "Score",
    sections: ["reading", "listening", "speaking", "writing"],
  },
  duolingo: {
    id: "duolingo",
    name: "Duolingo English Test",
    fullName: "Duolingo English Test Mock",
    scoreMax: 160,
    scoreLabel: "Score",
    sections: ["reading", "listening", "speaking", "writing"],
  },
  teps: {
    id: "teps",
    name: "TEPS",
    fullName: "TEPS Exam-style Mock",
    scoreMax: 600,
    scoreLabel: "Score",
    sections: ["reading", "listening", "speaking", "writing"],
  },
  toeic: {
    id: "toeic",
    name: "TOEIC",
    fullName: "TOEIC Exam-style Mock",
    scoreMax: 990,
    scoreLabel: "Score",
    sections: ["reading", "listening"],
  },
  oet: {
    id: "oet",
    name: "OET",
    fullName: "OET Exam-style Mock",
    scoreMax: 500,
    scoreLabel: "Score",
    sections: ["reading", "listening", "speaking", "writing"],
  },
};

export const EXAM_LIST = Object.values(EXAMS);

// SEO landing slugs → exam id (used by /toefl, /ielts, /pte, /duolingo)
export const EXAM_SLUGS: Record<string, string> = {
  toefl: "toefl",
  ielts: "ielts-academic",
  pte: "pte",
  duolingo: "duolingo",
};

export function mockProductsForExam(examId: string): MockProduct[] {
  return [
    {
      id: `${examId}-mini`,
      examId: examId as ExamProductExam,
      type: "mini",
      name: "Mini Mock",
      price: 9900,
      duration: "15–25 min",
      description: "빠른 실력 확인",
      features: ["Instant estimated score", "1 section snapshot"],
    },
    {
      id: `${examId}-section`,
      examId: examId as ExamProductExam,
      type: "section",
      name: "Section Mock",
      price: 19000,
      duration: "30–60 min",
      description: "한 영역 집중 테스트",
      features: ["Full-length single section", "Section-level analysis"],
    },
    {
      id: `${examId}-full`,
      examId: examId as ExamProductExam,
      type: "full",
      name: "Full Mock",
      price: 39000,
      duration: EXAM_EXTRA[examId]?.fullDuration ?? "2–3 hrs",
      description: "실전형 전체 시험",
      badge: "BEST",
      features: ["Score Report", "Weakness Analysis", "AI Recommendation"],
    },
  ];
}

type ExamProductExam = MockProduct["examId"];

export const MOCK_PACKS = [
  { id: "pack-3", label: "3 Mock Pack", discount: "10% OFF" },
  { id: "pack-5", label: "5 Mock Pack", discount: "15% OFF" },
];
