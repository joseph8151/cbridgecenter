export interface PlanTemplateWeek {
  week: number;
  focuses: string[];
}

export interface PlanTemplate {
  id: string;
  name: string; // e.g. "TOEFL 4-Week TARGET"
  courseId: string;
  examId: string;
  weeks: PlanTemplateWeek[];
}

// The AI Study Plan personalizes on top of these — see
// services/studyPlanner and services/weaknessEngine. This is the baseline
// curriculum shape an Academy operator sets per course, before a student's
// own weak skills shift day-to-day emphasis.
export const PLAN_TEMPLATES: PlanTemplate[] = [
  {
    id: "tpl-toefl-2wk",
    name: "TOEFL 2-WEEK BOOST",
    courseId: "boost-2wk",
    examId: "toefl",
    weeks: [
      { week: 1, focuses: ["Speaking Fluency Drill", "Reading Speed Foundation", "Writing Structure"] },
      { week: 2, focuses: ["Weakness Training", "Full Mock Simulation", "Final Review"] },
    ],
  },
  {
    id: "tpl-toefl-4wk",
    name: "TOEFL 4-Week TARGET",
    courseId: "target-4wk",
    examId: "toefl",
    weeks: [
      { week: 1, focuses: ["Reading Foundation", "Speaking Baseline", "Writing Structure"] },
      { week: 2, focuses: ["Weakness Training", "Vocabulary Expansion"] },
      { week: 3, focuses: ["Speaking Fluency Intensive", "Integrated Writing"] },
      { week: 4, focuses: ["Full Mock Simulation", "Final Weakness Sweep"] },
    ],
  },
  {
    id: "tpl-toefl-12wk",
    name: "TOEFL 12-WEEK MASTERY",
    courseId: "mastery-12wk",
    examId: "toefl",
    weeks: [
      { week: 1, focuses: ["Diagnostic Baseline", "Foundational Reading"] },
      { week: 2, focuses: ["Foundational Listening", "Speaking Basics"] },
      { week: 3, focuses: ["Writing Structure", "Vocabulary Building"] },
      { week: 4, focuses: ["Section Check Mock", "Weakness Review"] },
      { week: 6, focuses: ["Speaking Fluency Intensive"] },
      { week: 8, focuses: ["Mid Mock", "Writing Intensive"] },
      { week: 10, focuses: ["Weakness Training Round 2"] },
      { week: 12, focuses: ["Final Full Mock", "Score Review"] },
    ],
  },
];
