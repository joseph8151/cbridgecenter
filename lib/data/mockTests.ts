export type MockTestStatus = "draft" | "published" | "archived";

export interface MockTestSectionSpec {
  section: "reading" | "listening" | "speaking" | "writing";
  count: number;
}

export interface MockTestDefinition {
  id: string;
  name: string;
  examId: string;
  status: MockTestStatus;
  sections: MockTestSectionSpec[];
  questionIds: string[];
}

export const MOCK_TEST_DEFINITIONS: MockTestDefinition[] = [
  {
    id: "mt-toefl-07",
    name: "TOEFL Full Mock #07",
    examId: "toefl",
    status: "draft",
    sections: [
      { section: "reading", count: 20 },
      { section: "listening", count: 18 },
      { section: "speaking", count: 4 },
      { section: "writing", count: 2 },
    ],
    questionIds: ["toefl-read-a-q1", "toefl-read-a-q2", "toefl-listen-a-q1", "q-toefl-speak-t2-campus"],
  },
  {
    id: "mt-ielts-04",
    name: "IELTS Academic Full Mock #04",
    examId: "ielts-academic",
    status: "published",
    sections: [
      { section: "reading", count: 12 },
      { section: "listening", count: 10 },
      { section: "speaking", count: 3 },
      { section: "writing", count: 2 },
    ],
    questionIds: ["ielts-read-a-q1", "ielts-listen-a-q1", "q-ielts-speak-p1-work", "q-ielts-speak-p2-trip"],
  },
  {
    id: "mt-pte-02",
    name: "PTE Academic Full Mock #02",
    examId: "pte",
    status: "archived",
    sections: [
      { section: "speaking", count: 6 },
      { section: "writing", count: 2 },
    ],
    questionIds: ["q-pte-speak-describe-image", "q-pte-write-summarize"],
  },
];
