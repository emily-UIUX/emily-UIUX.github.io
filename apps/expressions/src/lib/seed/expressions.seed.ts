import type { Expression, ExpressionExample, ExpressionAudio, Difficulty } from "@/lib/types";
import { normalizeText } from "@/lib/types";

interface SeedInput {
  id: string;
  text: string;
  korean: string;
  pronunciation?: string;
  difficulty: Difficulty;
  tone?: string;
  isPhrase: boolean;
  tagSlugs: string[];
  examples: Array<{ en: string; ko: string }>;
}

const NOW = "2024-01-01T00:00:00.000Z";

const RAW: SeedInput[] = [
  {
    id: "seed-001",
    text: "Break the ice",
    korean: "어색한 분위기를 풀다",
    pronunciation: "breɪk ðə aɪs",
    difficulty: 2,
    tone: "casual",
    isPhrase: true,
    tagSlugs: ["idioms", "casual", "daily"],
    examples: [
      { en: "Let's play a game to break the ice.", ko: "어색함을 풀기 위해 게임 한번 해보자." },
      { en: "He told a joke to break the ice at the meeting.", ko: "그는 회의 분위기를 풀려고 농담을 했다." },
    ],
  },
  {
    id: "seed-002",
    text: "It's a piece of cake",
    korean: "식은 죽 먹기야",
    pronunciation: "ɪts ə piːs əv keɪk",
    difficulty: 1,
    tone: "casual",
    isPhrase: true,
    tagSlugs: ["idioms", "casual"],
    examples: [
      { en: "Don't worry, the test is a piece of cake.", ko: "걱정마, 그 시험은 식은 죽 먹기야." },
    ],
  },
  {
    id: "seed-003",
    text: "Could we circle back on this?",
    korean: "이 건 나중에 다시 논의해도 될까요?",
    pronunciation: "kʊd wiː ˈsɜːrkəl bæk ɒn ðɪs",
    difficulty: 3,
    tone: "formal",
    isPhrase: true,
    tagSlugs: ["business", "formal"],
    examples: [
      { en: "Could we circle back on this after lunch?", ko: "이 건 점심 후에 다시 얘기해도 될까요?" },
    ],
  },
  {
    id: "seed-004",
    text: "How's it going?",
    korean: "잘 지내?",
    pronunciation: "haʊz ɪt ˈɡoʊɪŋ",
    difficulty: 1,
    tone: "casual",
    isPhrase: true,
    tagSlugs: ["greetings", "casual", "daily"],
    examples: [
      { en: "Hey Mike, how's it going?", ko: "안녕 마이크, 잘 지내?" },
    ],
  },
  {
    id: "seed-005",
    text: "I'm swamped",
    korean: "정신없이 바빠",
    pronunciation: "aɪm swɒmpt",
    difficulty: 2,
    tone: "casual",
    isPhrase: true,
    tagSlugs: ["daily", "business", "emotions"],
    examples: [
      { en: "Sorry, I can't talk now — I'm swamped.", ko: "미안, 지금은 못 얘기해 — 너무 바빠." },
    ],
  },
  {
    id: "seed-006",
    text: "Let's touch base next week",
    korean: "다음 주에 다시 얘기하시죠",
    difficulty: 3,
    tone: "formal",
    isPhrase: true,
    tagSlugs: ["business", "formal"],
    examples: [
      { en: "Let's touch base next week to finalize the plan.", ko: "다음 주에 다시 얘기해서 계획을 마무리하시죠." },
    ],
  },
  {
    id: "seed-007",
    text: "Spill the tea",
    korean: "비밀 좀 풀어봐",
    difficulty: 3,
    tone: "slang",
    isPhrase: true,
    tagSlugs: ["slang", "casual", "idioms"],
    examples: [
      { en: "Come on, spill the tea — what happened last night?", ko: "어서, 비밀 풀어봐 — 어젯밤에 무슨 일 있었어?" },
    ],
  },
  {
    id: "seed-008",
    text: "Long time no see",
    korean: "오랜만이야",
    difficulty: 1,
    tone: "casual",
    isPhrase: true,
    tagSlugs: ["greetings", "casual", "daily"],
    examples: [
      { en: "Sarah! Long time no see!", ko: "사라! 오랜만이야!" },
    ],
  },
  {
    id: "seed-009",
    text: "Could you elaborate on that?",
    korean: "그 부분 좀 자세히 설명해 주시겠어요?",
    difficulty: 3,
    tone: "formal",
    isPhrase: true,
    tagSlugs: ["business", "formal", "academic"],
    examples: [
      { en: "Interesting point — could you elaborate on that?", ko: "흥미로운 지적이네요 — 자세히 설명해 주시겠어요?" },
    ],
  },
  {
    id: "seed-010",
    text: "Hit the road",
    korean: "출발하다 / 떠나다",
    difficulty: 2,
    tone: "casual",
    isPhrase: true,
    tagSlugs: ["idioms", "travel", "casual"],
    examples: [
      { en: "It's getting late — we'd better hit the road.", ko: "늦어진다 — 슬슬 출발해야겠어." },
    ],
  },
  {
    id: "seed-011",
    text: "I'm beat",
    korean: "완전 지쳤어",
    difficulty: 2,
    tone: "casual",
    isPhrase: true,
    tagSlugs: ["emotions", "casual", "daily"],
    examples: [
      { en: "What a long day. I'm beat.", ko: "긴 하루였네. 완전 지쳤어." },
    ],
  },
  {
    id: "seed-012",
    text: "Let me get back to you",
    korean: "다시 연락드릴게요",
    difficulty: 2,
    tone: "formal",
    isPhrase: true,
    tagSlugs: ["business", "formal", "daily"],
    examples: [
      { en: "I'm not sure right now. Let me get back to you.", ko: "지금은 확실치 않네요. 다시 연락드릴게요." },
    ],
  },
  {
    id: "seed-013",
    text: "On the same page",
    korean: "의견이 일치하는 / 같은 생각",
    difficulty: 3,
    tone: "neutral",
    isPhrase: true,
    tagSlugs: ["business", "idioms"],
    examples: [
      { en: "I want to make sure we're on the same page.", ko: "우리가 같은 생각인지 확실히 하고 싶어요." },
    ],
  },
  {
    id: "seed-014",
    text: "It slipped my mind",
    korean: "깜빡했어",
    difficulty: 3,
    tone: "casual",
    isPhrase: true,
    tagSlugs: ["daily", "casual", "emotions"],
    examples: [
      { en: "Sorry I didn't call — it slipped my mind.", ko: "전화 못 해서 미안 — 깜빡했어." },
    ],
  },
  {
    id: "seed-015",
    text: "Ballpark figure",
    korean: "대략적인 수치",
    difficulty: 4,
    tone: "formal",
    isPhrase: true,
    tagSlugs: ["business", "formal"],
    examples: [
      { en: "Can you give me a ballpark figure for the budget?", ko: "예산 대략적인 수치 좀 알려주실 수 있나요?" },
    ],
  },
  {
    id: "seed-016",
    text: "Speak of the devil",
    korean: "호랑이도 제 말 하면 온다",
    difficulty: 3,
    tone: "casual",
    isPhrase: true,
    tagSlugs: ["idioms", "casual"],
    examples: [
      { en: "Speak of the devil — there's Mark now!", ko: "호랑이도 제 말 하면 온다더니 — 저기 마크 왔다!" },
    ],
  },
  {
    id: "seed-017",
    text: "Take a rain check",
    korean: "다음 기회로 미루다",
    difficulty: 4,
    tone: "casual",
    isPhrase: true,
    tagSlugs: ["idioms", "casual", "daily"],
    examples: [
      { en: "I can't make it tonight — can I take a rain check?", ko: "오늘 밤은 못 가 — 다음으로 미뤄도 될까?" },
    ],
  },
  {
    id: "seed-018",
    text: "Off the top of my head",
    korean: "딱히 생각나는 건 / 떠오르는 대로",
    difficulty: 4,
    tone: "neutral",
    isPhrase: true,
    tagSlugs: ["idioms", "daily", "business"],
    examples: [
      { en: "Off the top of my head, I'd say around 30 people.", ko: "딱 떠오르는 대로 말하자면 30명 정도?" },
    ],
  },
  {
    id: "seed-019",
    text: "I beg to differ",
    korean: "저는 다르게 생각합니다",
    difficulty: 4,
    tone: "formal",
    isPhrase: true,
    tagSlugs: ["formal", "academic", "business"],
    examples: [
      { en: "I beg to differ — the data suggests otherwise.", ko: "저는 다르게 생각합니다 — 데이터는 반대를 보여줍니다." },
    ],
  },
  {
    id: "seed-020",
    text: "Catch you later",
    korean: "나중에 보자",
    difficulty: 1,
    tone: "casual",
    isPhrase: true,
    tagSlugs: ["greetings", "casual", "daily"],
    examples: [
      { en: "Gotta run — catch you later!", ko: "이만 가봐야 해 — 나중에 보자!" },
    ],
  },
  {
    id: "seed-021",
    text: "Where can I find...?",
    korean: "...을(를) 어디서 찾을 수 있나요?",
    difficulty: 1,
    tone: "neutral",
    isPhrase: true,
    tagSlugs: ["travel", "daily"],
    examples: [
      { en: "Excuse me, where can I find the restroom?", ko: "실례합니다, 화장실은 어디 있나요?" },
    ],
  },
  {
    id: "seed-022",
    text: "Bear with me",
    korean: "잠시만 기다려 주세요",
    difficulty: 3,
    tone: "formal",
    isPhrase: true,
    tagSlugs: ["formal", "business"],
    examples: [
      { en: "Bear with me — I'm pulling up the file now.", ko: "잠시만 기다려 주세요 — 지금 파일을 열고 있어요." },
    ],
  },
  {
    id: "seed-023",
    text: "Get the hang of it",
    korean: "요령을 익히다",
    difficulty: 3,
    tone: "casual",
    isPhrase: true,
    tagSlugs: ["idioms", "daily", "academic"],
    examples: [
      { en: "It's tricky at first, but you'll get the hang of it.", ko: "처음엔 까다롭지만 곧 요령이 생길 거야." },
    ],
  },
];

export const SEED_EXPRESSIONS: Expression[] = RAW.map((r) => ({
  id: r.id,
  text: r.text,
  normalizedText: normalizeText(r.text),
  korean: r.korean,
  pronunciation: r.pronunciation,
  difficulty: r.difficulty,
  tone: r.tone,
  isPhrase: r.isPhrase,
  createdAt: NOW,
  updatedAt: NOW,
  source: "seed",
  tagSlugs: r.tagSlugs,
}));

export const SEED_EXAMPLES: ExpressionExample[] = RAW.flatMap((r, i) =>
  r.examples.map((e, j) => ({
    id: `ex-${r.id}-${j}`,
    expressionId: r.id,
    english: e.en,
    korean: e.ko,
    sourceType: "manual" as const,
    createdAt: NOW,
  }))
);

export const SEED_AUDIO: ExpressionAudio[] = RAW.map((r) => ({
  id: `audio-${r.id}`,
  expressionId: r.id,
  provider: "speechSynthesis" as const,
  voiceKey: "default",
  accent: "us" as const,
  gender: "neutral" as const,
  generatedAt: NOW,
}));
