// Demo item set used by the Test Center take-test UI. Not exam-official —
// generic, C-Bridge-authored content so we never reproduce a real test
// publisher's material.

export type ExamItem =
  | {
      id: string;
      section: "reading";
      passageTitle: string;
      passage: string;
      question: string;
      choices: string[];
    }
  | {
      id: string;
      section: "listening";
      audioTitle: string;
      transcriptHint: string;
      question: string;
      choices: string[];
    }
  | {
      id: string;
      section: "speaking";
      prompt: string;
      prepSeconds: number;
      answerSeconds: number;
    }
  | {
      id: string;
      section: "writing";
      prompt: string;
      seconds: number;
      wordLimit: number;
    };

export const MOCK_EXAM_ITEMS: ExamItem[] = [
  {
    id: "r1",
    section: "reading",
    passageTitle: "Urban Green Space",
    passage:
      "Over the past two decades, city planners have increasingly prioritized green space as a core element of urban design rather than a decorative afterthought. Research suggests that access to parks and tree-lined streets is linked to lower stress levels and improved air quality. However, critics argue that green space initiatives can inadvertently raise property values in surrounding areas, a phenomenon sometimes called 'green gentrification,' which may displace long-time residents. Planners are now experimenting with community land trusts and rent stabilization policies to preserve the benefits of green space without the displacement effects.",
    question: "According to the passage, what is 'green gentrification'?",
    choices: [
      "A policy that removes parks from wealthy neighborhoods",
      "A rise in property values near green space that can displace residents",
      "A method for reducing air pollution in cities",
      "A community land trust used to build new parks",
    ],
  },
  {
    id: "r2",
    section: "reading",
    passageTitle: "Urban Green Space",
    passage:
      "Over the past two decades, city planners have increasingly prioritized green space as a core element of urban design rather than a decorative afterthought. Research suggests that access to parks and tree-lined streets is linked to lower stress levels and improved air quality. However, critics argue that green space initiatives can inadvertently raise property values in surrounding areas, a phenomenon sometimes called 'green gentrification,' which may displace long-time residents. Planners are now experimenting with community land trusts and rent stabilization policies to preserve the benefits of green space without the displacement effects.",
    question: "What solution do planners propose to address the drawback mentioned in the passage?",
    choices: [
      "Removing green space from city budgets entirely",
      "Building parks only in wealthy neighborhoods",
      "Community land trusts and rent stabilization policies",
      "Reducing the number of trees planted per block",
    ],
  },
  {
    id: "l1",
    section: "listening",
    audioTitle: "Campus Conversation",
    transcriptHint: "A student is talking to a professor about a research proposal deadline.",
    question: "Why does the student visit the professor?",
    choices: [
      "To ask for an extension on a proposal",
      "To drop a course",
      "To request a letter of recommendation",
      "To report a grading error",
    ],
  },
  {
    id: "l2",
    section: "listening",
    audioTitle: "Campus Conversation",
    transcriptHint: "A student is talking to a professor about a research proposal deadline.",
    question: "What does the professor suggest the student do?",
    choices: [
      "Submit the proposal early next week",
      "Switch research topics",
      "Meet with a teaching assistant instead",
      "Resubmit after the semester ends",
    ],
  },
  {
    id: "s1",
    section: "speaking",
    prompt:
      "Describe a skill you would like to learn in the future. Explain what it is and why you want to learn it.",
    prepSeconds: 15,
    answerSeconds: 45,
  },
  {
    id: "w1",
    section: "writing",
    prompt:
      "Do you agree or disagree with the following statement? Working from home is more productive than working in an office. Use specific reasons and examples to support your answer.",
    seconds: 20 * 60,
    wordLimit: 300,
  },
];
