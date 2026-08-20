// Central Question Bank.
//
// Exam -> Section -> Question Type -> Question Set -> Question is the shape
// every exam's content follows. Test Center (full mock take-flow), Score Lab
// (Speaking/Writing check), and Practice all read from BANK_QUESTIONS below
// instead of keeping their own copies — see lib/data/mockExam.ts and
// lib/data/questions.ts, which are now thin adapters over this file. Editing
// a question here updates every surface that uses it.
//
// Content note: every passage/prompt below is C-Bridge-authored. Nothing is
// reproduced from an official test provider — see section 39 of the product
// brief ("Realistic Test Environment", not "Official Test").

import { BankQuestion, QuestionSet } from "@/lib/types";
import { rubricFor } from "@/lib/data/rubrics";

const now = "2026-08-01T00:00:00.000Z";

function speakingWriting(
  examId: BankQuestion["examId"],
  section: "speaking" | "writing"
) {
  return rubricFor(examId, section);
}

export const BANK_QUESTIONS: BankQuestion[] = [
  // ---------------------------------------------------------------------
  // READING — TOEFL — Passage A: "Urban Green Space"
  // ---------------------------------------------------------------------
  {
    id: "toefl-read-a-q1",
    examId: "toefl",
    section: "reading",
    questionType: "inference",
    title: "Urban Green Space — Green Gentrification",
    passage:
      "Over the past two decades, city planners have increasingly prioritized green space as a core element of urban design rather than a decorative afterthought. Research suggests that access to parks and tree-lined streets is linked to lower stress levels and improved air quality. However, critics argue that green space initiatives can inadvertently raise property values in surrounding areas, a phenomenon sometimes called 'green gentrification,' which may displace long-time residents. Planners are now experimenting with community land trusts and rent stabilization policies to preserve the benefits of green space without the displacement effects.",
    prompt: "According to the passage, what is 'green gentrification'?",
    choices: [
      "A policy that removes parks from wealthy neighborhoods",
      "A rise in property values near green space that can displace residents",
      "A method for reducing air pollution in cities",
      "A community land trust used to build new parks",
    ],
    correctAnswer: "A rise in property values near green space that can displace residents",
    explanation:
      "The passage defines green gentrification directly: green space initiatives 'can inadvertently raise property values in surrounding areas... which may displace long-time residents.' The other choices describe things mentioned nearby in the passage (land trusts, air quality) but not the term being defined.",
    difficulty: "medium",
    skillTags: ["Inference"],
    estimatedTime: 90,
    sourceType: "cbridge-original",
    status: "published",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "toefl-read-a-q2",
    examId: "toefl",
    section: "reading",
    questionType: "detail",
    title: "Urban Green Space — Planners' Solution",
    passage:
      "Over the past two decades, city planners have increasingly prioritized green space as a core element of urban design rather than a decorative afterthought. Research suggests that access to parks and tree-lined streets is linked to lower stress levels and improved air quality. However, critics argue that green space initiatives can inadvertently raise property values in surrounding areas, a phenomenon sometimes called 'green gentrification,' which may displace long-time residents. Planners are now experimenting with community land trusts and rent stabilization policies to preserve the benefits of green space without the displacement effects.",
    prompt: "What solution do planners propose to address the drawback mentioned in the passage?",
    choices: [
      "Removing green space from city budgets entirely",
      "Building parks only in wealthy neighborhoods",
      "Community land trusts and rent stabilization policies",
      "Reducing the number of trees planted per block",
    ],
    correctAnswer: "Community land trusts and rent stabilization policies",
    explanation:
      "The passage's final sentence names the solution directly: planners are 'experimenting with community land trusts and rent stabilization policies' to prevent displacement while keeping green space's benefits.",
    difficulty: "easy",
    skillTags: ["Detail"],
    estimatedTime: 75,
    sourceType: "cbridge-original",
    status: "published",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "toefl-read-a-q3",
    examId: "toefl",
    section: "reading",
    questionType: "main-idea",
    title: "Urban Green Space — Main Idea",
    passage:
      "Over the past two decades, city planners have increasingly prioritized green space as a core element of urban design rather than a decorative afterthought. Research suggests that access to parks and tree-lined streets is linked to lower stress levels and improved air quality. However, critics argue that green space initiatives can inadvertently raise property values in surrounding areas, a phenomenon sometimes called 'green gentrification,' which may displace long-time residents. Planners are now experimenting with community land trusts and rent stabilization policies to preserve the benefits of green space without the displacement effects.",
    prompt: "Which statement best captures the main idea of the passage?",
    choices: [
      "Green space should be removed from city planning budgets.",
      "Green space brings real benefits, but planners must manage a side effect: displacement.",
      "Community land trusts are more important than parks.",
      "Air quality is the only reason cities build parks.",
    ],
    correctAnswer: "Green space brings real benefits, but planners must manage a side effect: displacement.",
    explanation:
      "The passage moves from benefits (stress, air quality) to a real drawback (displacement) to an emerging solution — the whole passage is about balancing green space's value against that side effect, which only choice B captures.",
    difficulty: "medium",
    skillTags: ["Main Idea"],
    estimatedTime: 80,
    sourceType: "cbridge-original",
    status: "published",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "toefl-read-a-q4",
    examId: "toefl",
    section: "reading",
    questionType: "vocabulary",
    title: "Urban Green Space — Vocabulary in Context",
    passage:
      "Over the past two decades, city planners have increasingly prioritized green space as a core element of urban design rather than a decorative afterthought. Research suggests that access to parks and tree-lined streets is linked to lower stress levels and improved air quality.",
    prompt: "The word 'afterthought' in the passage is closest in meaning to:",
    choices: ["a primary concern", "something considered only later, as an addition", "a scientific study", "a legal requirement"],
    correctAnswer: "something considered only later, as an addition",
    explanation:
      "'Afterthought' means something added or thought of after the main plan — the passage contrasts this with 'core element,' meaning green space used to be an add-on but is now central.",
    difficulty: "easy",
    skillTags: ["Vocabulary"],
    estimatedTime: 45,
    sourceType: "cbridge-original",
    status: "published",
    createdAt: now,
    updatedAt: now,
  },

  // ---------------------------------------------------------------------
  // READING — TOEFL — Passage B: "Urban Heat Islands"
  // ---------------------------------------------------------------------
  {
    id: "toefl-read-b-q1",
    examId: "toefl",
    section: "reading",
    questionType: "main-idea",
    title: "Urban Heat Islands — Main Idea",
    passage:
      "Cities are, on average, several degrees warmer than the rural areas surrounding them, a phenomenon known as the urban heat island effect. Asphalt, concrete, and dark rooftops absorb solar radiation during the day and release it slowly at night, keeping urban temperatures elevated long after sunset. The effect is most pronounced in neighborhoods with little tree cover, where residents — who are often lower-income — face higher cooling costs and greater health risks during heat waves. Some cities have responded by mandating reflective roofing materials and expanding tree-planting programs in historically under-shaded districts.",
    prompt: "What is the passage mainly about?",
    choices: [
      "How reflective roofing is manufactured",
      "Why cities are hotter than surrounding areas, and who is most affected",
      "The history of asphalt as a building material",
      "A comparison of rural and urban populations",
    ],
    correctAnswer: "Why cities are hotter than surrounding areas, and who is most affected",
    explanation:
      "The passage explains the cause of the urban heat island effect (materials absorbing and releasing heat) and then narrows to who bears the burden (lower-income, low-tree-cover neighborhoods) — that combination is the main idea.",
    difficulty: "easy",
    skillTags: ["Main Idea"],
    estimatedTime: 70,
    sourceType: "cbridge-original",
    status: "published",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "toefl-read-b-q2",
    examId: "toefl",
    section: "reading",
    questionType: "detail",
    title: "Urban Heat Islands — Detail",
    passage:
      "Cities are, on average, several degrees warmer than the rural areas surrounding them, a phenomenon known as the urban heat island effect. Asphalt, concrete, and dark rooftops absorb solar radiation during the day and release it slowly at night, keeping urban temperatures elevated long after sunset. The effect is most pronounced in neighborhoods with little tree cover, where residents — who are often lower-income — face higher cooling costs and greater health risks during heat waves. Some cities have responded by mandating reflective roofing materials and expanding tree-planting programs in historically under-shaded districts.",
    prompt: "According to the passage, why do urban temperatures stay high even at night?",
    choices: [
      "Cars continue to run all night",
      "Dark building materials release absorbed heat slowly after sunset",
      "Rural areas send warm air into cities",
      "Streetlights generate significant heat",
    ],
    correctAnswer: "Dark building materials release absorbed heat slowly after sunset",
    explanation:
      "The passage states materials 'absorb solar radiation during the day and release it slowly at night, keeping urban temperatures elevated long after sunset' — a direct match for choice B.",
    difficulty: "medium",
    skillTags: ["Detail"],
    estimatedTime: 75,
    sourceType: "cbridge-original",
    status: "published",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "toefl-read-b-q3",
    examId: "toefl",
    section: "reading",
    questionType: "inference",
    title: "Urban Heat Islands — Inference",
    passage:
      "The effect is most pronounced in neighborhoods with little tree cover, where residents — who are often lower-income — face higher cooling costs and greater health risks during heat waves. Some cities have responded by mandating reflective roofing materials and expanding tree-planting programs in historically under-shaded districts.",
    prompt: "It can be inferred from the passage that tree-planting programs are being targeted at under-shaded districts primarily to:",
    choices: [
      "improve the appearance of wealthy neighborhoods",
      "reduce the disproportionate heat burden on lower-income residents",
      "replace the need for reflective roofing entirely",
      "increase property tax revenue",
    ],
    correctAnswer: "reduce the disproportionate heat burden on lower-income residents",
    explanation:
      "The passage links low tree cover to lower-income residents facing higher costs and health risks, then says cities are 'expanding tree-planting programs in historically under-shaded districts' — the clear intent is to address that inequity, not the distractor options.",
    difficulty: "hard",
    skillTags: ["Inference"],
    estimatedTime: 100,
    sourceType: "cbridge-original",
    status: "published",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "toefl-read-b-q4",
    examId: "toefl",
    section: "reading",
    questionType: "author-purpose",
    title: "Urban Heat Islands — Author's Purpose",
    passage:
      "Some cities have responded by mandating reflective roofing materials and expanding tree-planting programs in historically under-shaded districts.",
    prompt: "Why does the author mention 'reflective roofing materials' and 'tree-planting programs' in the final sentence?",
    choices: [
      "To criticize cities for spending too much money",
      "To give examples of how cities are responding to the problem described earlier",
      "To argue that trees are more effective than roofing",
      "To introduce a completely new topic",
    ],
    correctAnswer: "To give examples of how cities are responding to the problem described earlier",
    explanation:
      "The sentence follows directly from the described problem (heat burden on under-shaded neighborhoods) and functions as supporting evidence of cities' responses — not a critique, comparison, or topic shift.",
    difficulty: "medium",
    skillTags: ["Author Purpose"],
    estimatedTime: 70,
    sourceType: "cbridge-original",
    status: "published",
    createdAt: now,
    updatedAt: now,
  },

  // ---------------------------------------------------------------------
  // READING — IELTS ACADEMIC — Passage C: "The Return of the Vinyl Record"
  // ---------------------------------------------------------------------
  {
    id: "ielts-read-a-q1",
    examId: "ielts-academic",
    section: "reading",
    questionType: "main-idea",
    title: "The Return of the Vinyl Record — Main Idea",
    passage:
      "After nearly disappearing in the 1990s, vinyl record sales have grown for seventeen consecutive years, driven largely by listeners under 35 who never owned a turntable during vinyl's original commercial peak. Industry analysts attribute the trend not to superior sound quality — digital formats are, by most technical measures, more accurate — but to the format's tangibility in an era of intangible media. Owning a record, proponents argue, creates a deliberate listening ritual that streaming cannot replicate. Critics counter that the resurgence is driven more by nostalgia marketing and collectible packaging than by any genuine engagement with the music itself.",
    prompt: "What is the main idea of the passage?",
    choices: [
      "Vinyl records sound better than digital formats.",
      "Vinyl's revival is explained more by its physical, ritual appeal than by sound quality, though this explanation is disputed.",
      "Young people are the only consumers who buy vinyl.",
      "Streaming services are losing market share to vinyl.",
    ],
    correctAnswer:
      "Vinyl's revival is explained more by its physical, ritual appeal than by sound quality, though this explanation is disputed.",
    explanation:
      "The passage explicitly rejects sound quality as the explanation, offers the tangibility/ritual explanation, and then presents a competing critical view — that combination is the main idea, not any single claim.",
    difficulty: "medium",
    skillTags: ["Main Idea"],
    estimatedTime: 90,
    sourceType: "cbridge-original",
    status: "published",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "ielts-read-a-q2",
    examId: "ielts-academic",
    section: "reading",
    questionType: "detail",
    title: "The Return of the Vinyl Record — Detail",
    passage:
      "After nearly disappearing in the 1990s, vinyl record sales have grown for seventeen consecutive years, driven largely by listeners under 35 who never owned a turntable during vinyl's original commercial peak.",
    prompt: "According to the passage, how long has vinyl's sales growth continued?",
    choices: ["Since the 1990s", "Seventeen consecutive years", "Since streaming began", "Only in the last two years"],
    correctAnswer: "Seventeen consecutive years",
    explanation: "The passage states sales 'have grown for seventeen consecutive years' — a direct detail lookup.",
    difficulty: "easy",
    skillTags: ["Detail"],
    estimatedTime: 40,
    sourceType: "cbridge-original",
    status: "published",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "ielts-read-a-q3",
    examId: "ielts-academic",
    section: "reading",
    questionType: "inference",
    title: "The Return of the Vinyl Record — Inference",
    passage:
      "Critics counter that the resurgence is driven more by nostalgia marketing and collectible packaging than by any genuine engagement with the music itself.",
    prompt: "What can be inferred about the critics' view mentioned in the passage?",
    choices: [
      "They believe vinyl buyers are primarily motivated by the music's sound quality.",
      "They are skeptical that vinyl buyers are primarily engaging with the music itself.",
      "They agree completely with the ritual-listening explanation.",
      "They think vinyl sales will decline next year.",
    ],
    correctAnswer: "They are skeptical that vinyl buyers are primarily engaging with the music itself.",
    explanation:
      "The critics attribute the resurgence to 'nostalgia marketing and collectible packaging... than genuine engagement with the music' — implying skepticism about music-driven motivation, which is what the correct choice states.",
    difficulty: "hard",
    skillTags: ["Inference"],
    estimatedTime: 95,
    sourceType: "cbridge-original",
    status: "published",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "ielts-read-a-q4",
    examId: "ielts-academic",
    section: "reading",
    questionType: "vocabulary",
    title: "The Return of the Vinyl Record — Vocabulary in Context",
    passage:
      "Industry analysts attribute the trend not to superior sound quality... but to the format's tangibility in an era of intangible media.",
    prompt: "The word 'tangibility' in the passage most nearly means:",
    choices: ["popularity", "the quality of being physically touchable", "affordability", "audio clarity"],
    correctAnswer: "the quality of being physically touchable",
    explanation:
      "'Tangibility' is contrasted with 'intangible media' (streaming) — it refers to vinyl being a physical object you can hold, not popularity or sound.",
    difficulty: "easy",
    skillTags: ["Vocabulary"],
    estimatedTime: 40,
    sourceType: "cbridge-original",
    status: "published",
    createdAt: now,
    updatedAt: now,
  },

  // ---------------------------------------------------------------------
  // LISTENING — TOEFL — Audio A: "Campus Conversation"
  // ---------------------------------------------------------------------
  {
    id: "toefl-listen-a-q1",
    examId: "toefl",
    section: "listening",
    questionType: "detail",
    title: "Campus Conversation — Why the Student Visits",
    audioTitle: "Campus Conversation",
    prompt: "Listen to a conversation between a student and a professor. Why does the student visit the professor?",
    choices: [
      "To ask for an extension on a proposal",
      "To drop a course",
      "To request a letter of recommendation",
      "To report a grading error",
    ],
    correctAnswer: "To ask for an extension on a proposal",
    explanation:
      "The student opens the conversation explaining her research proposal isn't finished and asks whether she can turn it in later than the posted deadline — a request for an extension.",
    difficulty: "easy",
    skillTags: ["Detail"],
    estimatedTime: 60,
    sourceType: "cbridge-original",
    status: "published",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "toefl-listen-a-q2",
    examId: "toefl",
    section: "listening",
    questionType: "inference",
    title: "Campus Conversation — Professor's Suggestion",
    audioTitle: "Campus Conversation",
    prompt: "What does the professor suggest the student do?",
    choices: [
      "Submit the proposal early next week",
      "Switch research topics",
      "Meet with a teaching assistant instead",
      "Resubmit after the semester ends",
    ],
    correctAnswer: "Submit the proposal early next week",
    explanation:
      "The professor agrees to a short extension but specifically proposes a new date early the following week rather than an open-ended delay — the other options aren't discussed in the conversation.",
    difficulty: "medium",
    skillTags: ["Inference"],
    estimatedTime: 70,
    sourceType: "cbridge-original",
    status: "published",
    createdAt: now,
    updatedAt: now,
  },

  // ---------------------------------------------------------------------
  // LISTENING — TOEFL — Audio B: "Lecture: Coral Bleaching"
  // ---------------------------------------------------------------------
  {
    id: "toefl-listen-b-q1",
    examId: "toefl",
    section: "listening",
    questionType: "main-idea",
    title: "Lecture: Coral Bleaching — Main Idea",
    audioTitle: "Lecture — Marine Biology: Coral Bleaching",
    prompt: "Listen to part of a lecture in a marine biology class. What is the lecture mainly about?",
    choices: [
      "How coral reefs form over centuries",
      "Why rising ocean temperatures cause coral to expel their algae and turn white",
      "The commercial fishing industry's impact on reefs",
      "A comparison of coral species around the world",
    ],
    correctAnswer: "Why rising ocean temperatures cause coral to expel their algae and turn white",
    explanation:
      "The professor's lecture centers on the mechanism of bleaching — heat stress causing coral to expel the algae that give it color and much of its energy — which is the lecture's throughline.",
    difficulty: "easy",
    skillTags: ["Main Idea"],
    estimatedTime: 65,
    sourceType: "cbridge-original",
    status: "published",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "toefl-listen-b-q2",
    examId: "toefl",
    section: "listening",
    questionType: "detail",
    title: "Lecture: Coral Bleaching — Detail",
    audioTitle: "Lecture — Marine Biology: Coral Bleaching",
    prompt: "According to the lecture, what do the algae provide to coral under normal conditions?",
    choices: ["Protection from predators", "Most of the coral's energy through photosynthesis", "Structural calcium", "Camouflage from fish"],
    correctAnswer: "Most of the coral's energy through photosynthesis",
    explanation:
      "The professor explains the symbiotic relationship: algae living in coral tissue photosynthesize and pass most of the resulting energy to the coral — the reason bleaching is so damaging.",
    difficulty: "medium",
    skillTags: ["Detail"],
    estimatedTime: 70,
    sourceType: "cbridge-original",
    status: "published",
    createdAt: now,
    updatedAt: now,
  },

  // ---------------------------------------------------------------------
  // LISTENING — IELTS — Audio C: "Renting an Apartment"
  // ---------------------------------------------------------------------
  {
    id: "ielts-listen-a-q1",
    examId: "ielts-academic",
    section: "listening",
    questionType: "detail",
    title: "Renting an Apartment — Detail",
    audioTitle: "Everyday Listening — Renting an Apartment",
    prompt: "Listen to a conversation between a prospective tenant and a letting agent. How much is the monthly deposit?",
    choices: ["One month's rent", "Two months' rent", "No deposit is required", "Half a month's rent"],
    correctAnswer: "Two months' rent",
    explanation: "The agent states the deposit clearly as 'two months' rent, refundable at the end of the tenancy.'",
    difficulty: "easy",
    skillTags: ["Detail"],
    estimatedTime: 55,
    sourceType: "cbridge-original",
    status: "published",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "ielts-listen-a-q2",
    examId: "ielts-academic",
    section: "listening",
    questionType: "note-taking",
    title: "Renting an Apartment — Note-taking",
    audioTitle: "Everyday Listening — Renting an Apartment",
    prompt: "Complete the note: the apartment is available to move in from the ___ of next month.",
    choices: ["1st", "15th", "last week", "30th"],
    correctAnswer: "15th",
    explanation: "The agent says the current tenant moves out on the 14th, so the apartment is available 'from the 15th.'",
    difficulty: "medium",
    skillTags: ["Note-taking"],
    estimatedTime: 65,
    sourceType: "cbridge-original",
    status: "published",
    createdAt: now,
    updatedAt: now,
  },

  // ---------------------------------------------------------------------
  // SPEAKING
  // ---------------------------------------------------------------------
  {
    id: "q-ielts-speak-p2-trip",
    examId: "ielts-academic",
    section: "speaking",
    questionType: "part2",
    title: "IELTS Speaking Part 2 — Memorable Trip",
    prompt:
      "Describe a memorable trip you took. You should say: where you went, who you went with, what you did there, and explain why it was memorable.",
    explanation:
      "A strong Part 2 answer covers all four bullet points, uses linking language to move between them naturally, and closes with a clear reason the trip was memorable rather than trailing off.",
    difficulty: "medium",
    skillTags: ["Fluency", "Coherence", "Vocabulary"],
    estimatedTime: 180,
    sourceType: "cbridge-original",
    status: "published",
    createdAt: now,
    updatedAt: now,
    prepTime: 60,
    answerTime: 120,
    scoringCriteria: speakingWriting("ielts-academic", "speaking"),
  },
  {
    id: "q-ielts-speak-p1-work",
    examId: "ielts-academic",
    section: "speaking",
    questionType: "part1",
    title: "IELTS Speaking Part 1 — Work or Study",
    prompt: "Do you work or are you a student? What do you like most about it?",
    explanation:
      "Part 1 answers should be short but complete — a one-word answer plus one clear reason is stronger than a long, unfocused response.",
    difficulty: "easy",
    skillTags: ["Fluency", "Grammar"],
    estimatedTime: 60,
    sourceType: "cbridge-original",
    status: "published",
    createdAt: now,
    updatedAt: now,
    prepTime: 15,
    answerTime: 45,
    scoringCriteria: speakingWriting("ielts-academic", "speaking"),
  },
  {
    id: "q-toefl-speak-t2-campus",
    examId: "toefl",
    section: "speaking",
    questionType: "independent-task",
    title: "TOEFL Speaking Task 2 — Study Preference",
    prompt:
      "Some students prefer to study alone. Others prefer to study with a group. Which do you prefer and why?",
    explanation:
      "Strong independent-task answers state a clear position immediately, then support it with one well-developed reason and a specific example rather than several shallow ones.",
    difficulty: "easy",
    skillTags: ["Topic Development", "Delivery"],
    estimatedTime: 60,
    sourceType: "cbridge-original",
    status: "published",
    createdAt: now,
    updatedAt: now,
    prepTime: 15,
    answerTime: 45,
    scoringCriteria: speakingWriting("toefl", "speaking"),
  },
  {
    id: "q-pte-speak-describe-image",
    examId: "pte",
    section: "speaking",
    questionType: "describe-image",
    title: "PTE Speaking — Describe Image",
    prompt:
      "Look at the graph showing university enrollment by field of study over ten years. In 25 seconds, describe what the image shows.",
    explanation:
      "High-scoring answers name the chart type, state the overall trend first, then cite two or three specific data points — vague description without numbers scores lower on Content.",
    difficulty: "medium",
    skillTags: ["Content", "Oral Fluency"],
    estimatedTime: 65,
    sourceType: "cbridge-original",
    status: "published",
    createdAt: now,
    updatedAt: now,
    prepTime: 25,
    answerTime: 40,
    scoringCriteria: speakingWriting("pte", "speaking"),
  },
  {
    id: "q-det-speak-interview",
    examId: "duolingo",
    section: "speaking",
    questionType: "speaking-sample",
    title: "Duolingo English Test — Speaking Sample",
    prompt: "Talk about a change you would like to make in your daily routine, and why.",
    explanation:
      "DET's speaking sample is scored holistically — aim for natural, connected speech over the full response time rather than a short, rehearsed-sounding answer.",
    difficulty: "medium",
    skillTags: ["Fluency", "Grammar"],
    estimatedTime: 110,
    sourceType: "cbridge-original",
    status: "published",
    createdAt: now,
    updatedAt: now,
    prepTime: 20,
    answerTime: 90,
    scoringCriteria: speakingWriting("duolingo", "speaking"),
  },

  // ---------------------------------------------------------------------
  // WRITING
  // ---------------------------------------------------------------------
  {
    id: "q-ielts-write-t2-tech",
    examId: "ielts-academic",
    section: "writing",
    questionType: "task2",
    title: "IELTS Writing Task 2 — Technology Debate",
    prompt:
      "Some people think technology has made our lives more complicated, while others think it has made life easier. Discuss both views and give your own opinion.",
    explanation:
      "Task 2 essays need a clear position stated in the introduction, one body paragraph per view (both sides, even in a discuss-both-views task), and a conclusion that restates the opinion — essays that only argue one side lose Task Achievement marks.",
    difficulty: "medium",
    skillTags: ["Task Response", "Coherence"],
    estimatedTime: 2400,
    sourceType: "cbridge-original",
    status: "published",
    createdAt: now,
    updatedAt: now,
    recommendedWords: 250,
    minimumWords: 250,
    timeLimit: 2400,
    scoringCriteria: speakingWriting("ielts-academic", "writing"),
  },
  {
    id: "q-toefl-write-independent",
    examId: "toefl",
    section: "writing",
    questionType: "independent-task",
    title: "TOEFL Writing — Independent Task",
    prompt:
      "Do you agree or disagree with the following statement? Success in life is mostly determined by luck rather than effort. Use specific reasons and examples to support your answer.",
    explanation:
      "Strong independent essays develop one central example in depth (a specific person or situation) rather than listing several generic reasons — depth of development is what separates a 4 from a 5.",
    difficulty: "medium",
    skillTags: ["Development", "Organization"],
    estimatedTime: 1800,
    sourceType: "cbridge-original",
    status: "published",
    createdAt: now,
    updatedAt: now,
    recommendedWords: 300,
    minimumWords: 300,
    timeLimit: 1800,
    scoringCriteria: speakingWriting("toefl", "writing"),
  },
  {
    id: "q-pte-write-summarize",
    examId: "pte",
    section: "writing",
    questionType: "summarize-text",
    title: "PTE Writing — Summarize Written Text",
    prompt:
      "Summarize the following passage about renewable energy adoption in a single sentence of no more than 75 words, capturing the main point and key supporting details.",
    explanation:
      "This task is scored partly on form — it must be exactly one sentence. Two sentences (even if well-written) lose the form point automatically.",
    difficulty: "hard",
    skillTags: ["Content", "Form & Spelling"],
    estimatedTime: 600,
    sourceType: "cbridge-original",
    status: "published",
    createdAt: now,
    updatedAt: now,
    recommendedWords: 75,
    minimumWords: 5,
    timeLimit: 600,
    scoringCriteria: speakingWriting("pte", "writing"),
  },
  {
    id: "q-det-write-photo",
    examId: "duolingo",
    section: "writing",
    questionType: "writing-sample",
    title: "Duolingo English Test — Writing Sample",
    prompt:
      "Look at the photo of a busy city intersection. Write a description of what you see and what might happen next.",
    explanation:
      "The writing sample rewards varied sentence structure and specific description over generic statements — describe concrete details in the (imagined) photo rather than writing in the abstract.",
    difficulty: "easy",
    skillTags: ["Coherence", "Vocabulary"],
    estimatedTime: 300,
    sourceType: "cbridge-original",
    status: "published",
    createdAt: now,
    updatedAt: now,
    recommendedWords: 150,
    minimumWords: 20,
    timeLimit: 300,
    scoringCriteria: speakingWriting("duolingo", "writing"),
  },
];

export const QUESTION_SETS: QuestionSet[] = [
  {
    id: "set-toefl-reading-01",
    examId: "toefl",
    section: "reading",
    questionType: "mixed",
    name: "TOEFL Reading — Practice Set 01",
    questionIds: ["toefl-read-a-q1", "toefl-read-a-q2", "toefl-read-a-q3", "toefl-read-a-q4"],
  },
  {
    id: "set-toefl-reading-02",
    examId: "toefl",
    section: "reading",
    questionType: "mixed",
    name: "TOEFL Reading — Practice Set 02",
    questionIds: ["toefl-read-b-q1", "toefl-read-b-q2", "toefl-read-b-q3", "toefl-read-b-q4"],
  },
  {
    id: "set-ielts-reading-01",
    examId: "ielts-academic",
    section: "reading",
    questionType: "mixed",
    name: "IELTS Reading — Practice Set 01",
    questionIds: ["ielts-read-a-q1", "ielts-read-a-q2", "ielts-read-a-q3", "ielts-read-a-q4"],
  },
  {
    id: "set-toefl-listening-01",
    examId: "toefl",
    section: "listening",
    questionType: "conversation",
    name: "TOEFL Listening — Conversation Practice 01",
    questionIds: ["toefl-listen-a-q1", "toefl-listen-a-q2"],
  },
  {
    id: "set-toefl-listening-02",
    examId: "toefl",
    section: "listening",
    questionType: "lecture",
    name: "TOEFL Listening — Lecture Practice 02",
    questionIds: ["toefl-listen-b-q1", "toefl-listen-b-q2"],
  },
  {
    id: "set-ielts-listening-01",
    examId: "ielts-academic",
    section: "listening",
    questionType: "everyday",
    name: "IELTS Listening — Everyday Practice 01",
    questionIds: ["ielts-listen-a-q1", "ielts-listen-a-q2"],
  },
  {
    id: "set-ielts-speaking-01",
    examId: "ielts-academic",
    section: "speaking",
    questionType: "mixed",
    name: "IELTS Speaking — Practice Set 01",
    questionIds: ["q-ielts-speak-p1-work", "q-ielts-speak-p2-trip"],
  },
  {
    id: "set-toefl-speaking-01",
    examId: "toefl",
    section: "speaking",
    questionType: "independent-task",
    name: "TOEFL Speaking — Independent Practice 01",
    questionIds: ["q-toefl-speak-t2-campus"],
  },
  {
    id: "set-pte-speaking-01",
    examId: "pte",
    section: "speaking",
    questionType: "describe-image",
    name: "PTE Speaking — Describe Image Practice 01",
    questionIds: ["q-pte-speak-describe-image"],
  },
  {
    id: "set-det-speaking-01",
    examId: "duolingo",
    section: "speaking",
    questionType: "speaking-sample",
    name: "Duolingo Speaking — Practice Set 01",
    questionIds: ["q-det-speak-interview"],
  },
  {
    id: "set-ielts-writing-01",
    examId: "ielts-academic",
    section: "writing",
    questionType: "task2",
    name: "IELTS Writing — Task 2 Practice 01",
    questionIds: ["q-ielts-write-t2-tech"],
  },
  {
    id: "set-toefl-writing-01",
    examId: "toefl",
    section: "writing",
    questionType: "independent-task",
    name: "TOEFL Writing — Independent Practice 01",
    questionIds: ["q-toefl-write-independent"],
  },
  {
    id: "set-pte-writing-01",
    examId: "pte",
    section: "writing",
    questionType: "summarize-text",
    name: "PTE Writing — Summarize Text Practice 01",
    questionIds: ["q-pte-write-summarize"],
  },
  {
    id: "set-det-writing-01",
    examId: "duolingo",
    section: "writing",
    questionType: "writing-sample",
    name: "Duolingo Writing — Practice Set 01",
    questionIds: ["q-det-write-photo"],
  },
];

export function getQuestion(id: string): BankQuestion | undefined {
  return BANK_QUESTIONS.find((q) => q.id === id);
}

export function getQuestions(filter: {
  examId?: string;
  section?: string;
  questionType?: string;
  difficulty?: string;
  skillTag?: string;
} = {}): BankQuestion[] {
  return BANK_QUESTIONS.filter(
    (q) =>
      (!filter.examId || q.examId === filter.examId) &&
      (!filter.section || q.section === filter.section) &&
      (!filter.questionType || q.questionType === filter.questionType) &&
      (!filter.difficulty || q.difficulty === filter.difficulty) &&
      (!filter.skillTag || q.skillTags.includes(filter.skillTag))
  );
}

export function getSet(id: string): QuestionSet | undefined {
  return QUESTION_SETS.find((s) => s.id === id);
}

export function getSetsFor(examId: string, section?: string): QuestionSet[] {
  return QUESTION_SETS.filter((s) => s.examId === examId && (!section || s.section === section));
}

export function questionsInSet(setId: string): BankQuestion[] {
  const set = getSet(setId);
  if (!set) return [];
  return set.questionIds.map(getQuestion).filter((q): q is BankQuestion => !!q);
}
