---
name: hsk-domain
description: "Activate for any task specific to the Ruby HSK business domain: course structure, HSK levels, teacher profile, contact information, Vietnamese/Chinese language learning context, site constants, bilingual content, design system tokens, or any task that references ruby-hsk brand identity. Also activates for learning platform features: lessons, vocabulary, grammar, quiz, listening, reading, writing, speaking, review, spaced repetition, flashcard, dictionary, progress, gamification, daily challenge, ranking."
---

# HSK Domain Skill

## Purpose

Single source of truth for the **Ruby HSK platform domain**. Covers both the current public landing site and the full HSK learning platform domain model. Any content, data shape, naming, or business logic decision must be grounded in this skill.

---

## Business Context

**Ruby HSK** is a Vietnamese Chinese-language school located in **Hà Nội, Vietnam**.

- **Mission:** Help Vietnamese learners master Mandarin Chinese through structured HSK-standard curriculum.
- **Model:** Small classes, 1-on-1 tutoring, online sessions, and a self-study digital platform.
- **Audience:** Vietnamese adults and young learners preparing for HSK exams or conversational fluency.
- **Brand Voice:** Warm, trustworthy, academic — not corporate, not casual.
- **Languages:** Vietnamese (`vi`, default) / English (`en`). All content is bilingual.

### The Single Instructor

**One teacher: Cô Trần Hồng Ngọc (Ms. Ruby Tran)**. Never add a second teacher, assistant, or co-instructor.

All brand constants live in `src/lib/constants/site.ts` — never hardcode these values:

```ts
export const Teacher = {
  fullName: 'Trần Hồng Ngọc',
  title: 'Thạc sĩ Hán ngữ học',
  yearsExperience: 5,          // always 5, never 10
};
export const Contact = {
  phone: '0965 322 136',
  email: 'tranhongngoc19122001@gmail.com',
  address: '...Hà Nội',        // Hà Nội — not TP. HCM
  facebook: 'https://facebook.com/rubyhsk',
  messenger: 'https://m.me/rubyhsk',
};
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rubyhsk.vn';
export const SITE_NAME = 'Ruby HSK';
```

---

## Domain Model

### Core Entity Map

```
User
 ├── Enrollment (User ↔ Course)
 ├── LessonProgress (User ↔ Lesson)
 ├── QuizAttempt (User ↔ Quiz)
 ├── VocabCard (User ↔ Vocabulary — spaced repetition state)
 ├── DailyChallenge (User, date-scoped)
 ├── UserStreak (User — gamification)
 └── UserRanking (User — leaderboard)

Course
 ├── hsk_level: HskLevel
 ├── mode: CourseMode
 └── Unit[]
      └── Lesson[]
           ├── LessonType
           ├── VocabularyItem[]
           ├── GrammarPoint[]
           ├── Exercise[]
           │    ├── Quiz
           │    ├── ListeningExercise
           │    ├── ReadingPassage
           │    ├── WritingPrompt
           │    └── SpeakingPrompt
           └── Review (end-of-unit)

Vocabulary
 ├── hanzi: string          (Chinese character)
 ├── pinyin: string         (phonetic romanization)
 ├── meaning_vi: string
 ├── meaning_en: string
 ├── hsk_level: HskLevel
 ├── audio_url: string      (pronunciation audio)
 ├── example_sentences: ExampleSentence[]
 └── stroke_order_url?: string

GrammarPoint
 ├── pattern: string        (e.g. "Subject + 是 + Noun")
 ├── explanation_vi: string
 ├── explanation_en: string
 ├── examples: GrammarExample[]
 └── hsk_level: HskLevel

Flashcard (user-generated or system-generated)
 ├── front: string          (question side — usually hanzi or pinyin)
 ├── back: string           (answer side — usually meaning)
 ├── vocab_id?: string      (FK to Vocabulary)
 └── SrsCard (spaced repetition state)
```

---

## HSK Levels

The HSK (Hàn ngữ Thủy bình Khảo thí) standard defines 9 levels in the new HSK 3.0:

| Level | Band | Vocab Count | CEFR Equivalent |
|---|---|---|---|
| HSK 1 | 初级 (Sơ cấp) | ~500 | A1 |
| HSK 2 | 初级 | ~1,272 | A2 |
| HSK 3 | 中级 (Trung cấp) | ~2,245 | B1 |
| HSK 4 | 中级 | ~3,245 | B1–B2 |
| HSK 5 | 高级 (Cao cấp) | ~4,316 | B2–C1 |
| HSK 6 | 高级 | ~5,456 | C1 |
| HSK 7 | 超高级 | ~5,456+ | C1–C2 |
| HSK 8 | 超高级 | ~5,456+ | C2 |
| HSK 9 | 超高级 | Master | C2 |

> For this platform, **HSK 1–6** are the primary target levels. HSK 7–9 are future scope.

### TypeScript enum

```ts
// src/types/domain.ts
export type HskLevel = 'HSK1' | 'HSK2' | 'HSK3' | 'HSK4' | 'HSK5' | 'HSK6' | 'HSK7' | 'HSK8' | 'HSK9';

export const HSK_LEVEL_LABELS: Record<HskLevel, { vi: string; en: string; band: string }> = {
  HSK1: { vi: 'Sơ cấp HSK 1', en: 'Elementary HSK 1', band: '初级' },
  HSK2: { vi: 'Sơ cấp HSK 2', en: 'Elementary HSK 2', band: '初级' },
  HSK3: { vi: 'Trung cấp HSK 3', en: 'Intermediate HSK 3', band: '中级' },
  HSK4: { vi: 'Trung cấp HSK 4', en: 'Intermediate HSK 4', band: '中级' },
  HSK5: { vi: 'Cao cấp HSK 5', en: 'Advanced HSK 5', band: '高级' },
  HSK6: { vi: 'Cao cấp HSK 6', en: 'Advanced HSK 6', band: '高级' },
  HSK7: { vi: 'Thành thạo HSK 7', en: 'Master HSK 7', band: '超高级' },
  HSK8: { vi: 'Thành thạo HSK 8', en: 'Master HSK 8', band: '超高级' },
  HSK9: { vi: 'Thành thạo HSK 9', en: 'Master HSK 9', band: '超高级' },
};
```

---

## Lesson

The atomic learning unit. A lesson belongs to a Unit, which belongs to a Course.

### Lesson Types

```ts
export type LessonType =
  | 'vocabulary'    // vocab introduction + audio
  | 'grammar'       // grammar explanation + pattern practice
  | 'listening'     // audio comprehension
  | 'reading'       // text comprehension
  | 'writing'       // character writing / composition
  | 'speaking'      // pronunciation / oral response
  | 'quiz'          // knowledge check
  | 'review';       // spaced review session (end of unit)
```

### Lesson DB Schema

```prisma
model Lesson {
  id            String     @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  titleVi       String     @map("title_vi")
  titleEn       String     @map("title_en")
  type          LessonType
  hskLevel      HskLevel   @map("hsk_level")
  unitId        String     @map("unit_id") @db.Uuid
  sortOrder     Int        @default(0) @map("sort_order")
  durationMins  Int        @default(15) @map("duration_mins")
  xpReward      Int        @default(10) @map("xp_reward")
  isPublished   Boolean    @default(false) @map("is_published")
  deletedAt     DateTime?  @map("deleted_at")
  createdAt     DateTime   @default(now()) @map("created_at")
  updatedAt     DateTime   @updatedAt @map("updated_at")

  unit          Unit       @relation(fields: [unitId], references: [id])
  progress      LessonProgress[]
  exercises     Exercise[]

  @@index([unitId, sortOrder])
  @@index([hskLevel, type])
  @@map("lessons")
}

model LessonProgress {
  id          String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  userId      String   @map("user_id") @db.Uuid
  lessonId    String   @map("lesson_id") @db.Uuid
  status      ProgressStatus  @default(NOT_STARTED)
  score       Int?
  completedAt DateTime? @map("completed_at")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  @@unique([userId, lessonId])
  @@index([userId, status])
  @@map("lesson_progress")
}

enum ProgressStatus { NOT_STARTED IN_PROGRESS COMPLETED }
```

---

## Vocabulary

### Data Model

```ts
interface VocabularyItem {
  id: string;
  hanzi: string;              // Chinese character(s): 你好
  simplified: string;         // Simplified Chinese (same as hanzi for HSK)
  traditional?: string;       // Traditional Chinese: 你好 (if differs)
  pinyin: string;             // Phonetic: nǐ hǎo
  pinyinNumeric: string;      // Numeric tone: ni3 hao3
  meaningVi: string;          // Vietnamese meaning: Xin chào
  meaningEn: string;          // English meaning: Hello
  partOfSpeech: PartOfSpeech; // noun | verb | adjective | adverb | ...
  hskLevel: HskLevel;
  audioUrl: string;           // Standard Mandarin pronunciation
  strokeOrderUrl?: string;    // Animated stroke order GIF/SVG
  exampleSentences: ExampleSentence[];
  tags: string[];             // ['greeting', 'daily-life']
  frequency: number;          // 1–9999 frequency rank (lower = more common)
}

interface ExampleSentence {
  hanzi: string;
  pinyin: string;
  translationVi: string;
  translationEn: string;
  audioUrl?: string;
}

type PartOfSpeech =
  | 'noun' | 'verb' | 'adjective' | 'adverb'
  | 'pronoun' | 'measure_word' | 'conjunction'
  | 'preposition' | 'particle' | 'interjection' | 'numeral';
```

### Display Rules

- Always show: **hanzi** (large) + **pinyin** (smaller, below) + **meaning** (in user's locale)
- Tone colors (standard convention):
  - Tone 1 (ā): `var(--color-tone-1)` → flat high — use primary color
  - Tone 2 (á): `var(--color-tone-2)` → rising — use tertiary/green
  - Tone 3 (ǎ): `var(--color-tone-3)` → dip — use secondary/gold
  - Tone 4 (à): `var(--color-tone-4)` → falling — use error/red
  - Neutral (a): `var(--color-tone-neutral)` → grey
- Never display pinyin without tone marks (ā á ǎ à · not a2 a3 a4)
- Audio play button must be accessible: `aria-label="Phát âm 你好"`

---

## Grammar

### Grammar Point Structure

```ts
interface GrammarPoint {
  id: string;
  hskLevel: HskLevel;
  pattern: string;             // e.g. "Subject + 是 + Noun"
  patternHanzi: string;        // e.g. "主语 + 是 + 名词"
  nameVi: string;              // e.g. "Câu khẳng định với 是"
  nameEn: string;              // e.g. "Affirmative sentence with 是"
  explanationVi: string;       // Full markdown explanation in Vietnamese
  explanationEn: string;
  examples: GrammarExample[];
  relatedPatterns: string[];   // IDs of related grammar points
  commonMistakes: string[];    // Common errors Vietnamese learners make
}

interface GrammarExample {
  hanzi: string;
  pinyin: string;
  translationVi: string;
  translationEn: string;
  annotated?: AnnotatedToken[]; // token-by-token breakdown
}
```

### Vietnamese Learner Specifics

- Vietnamese is SVO like Mandarin → highlight similarities.
- Tone system: Vietnamese has 6 tones, Mandarin has 4+1 — leverage this familiarity.
- Common mistakes for Vietnamese learners:
  - Forgetting measure words (量词 liàngcí)
  - Topic-comment sentence order from Vietnamese
  - Omitting 了 (le) for completed actions
- Grammar explanations must always reference the Vietnamese equivalent structure when possible.

---

## Quiz

### Question Types

```ts
export type QuizQuestionType =
  | 'multiple_choice'       // pick 1 of 4 options
  | 'true_false'            // is the sentence correct?
  | 'fill_in_blank'         // type the missing word
  | 'matching'              // match hanzi ↔ meaning
  | 'ordering'              // arrange words into correct sentence
  | 'translation_vi_to_zh'  // translate Vietnamese → Chinese
  | 'translation_zh_to_vi'  // translate Chinese → Vietnamese
  | 'pinyin_to_hanzi'       // given pinyin, write hanzi
  | 'hanzi_to_pinyin'       // given hanzi, write pinyin
  | 'tone_selection';       // select correct tone mark
```

### Quiz Attempt Model

```ts
interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  lessonId?: string;
  score: number;            // 0–100
  totalQuestions: number;
  correctAnswers: number;
  timeTakenSecs: number;
  xpEarned: number;
  answers: QuizAnswer[];
  startedAt: Date;
  completedAt?: Date;
}

interface QuizAnswer {
  questionId: string;
  selected: string;         // user's answer
  correct: string;          // correct answer
  isCorrect: boolean;
  timeTakenSecs: number;
}
```

### Quiz Scoring Rules

- Pass threshold: **70%** correct
- XP earned: `Math.round(quiz.xpReward * (score / 100))`
- Time bonus: if `timeTakenSecs < quiz.timeLimitSecs * 0.5`, award +20% XP
- Retry allowed: unlimited, but XP only awarded once per day per quiz
- Show immediate feedback after each answer (not at end) — this aids retention

---

## Listening

```ts
interface ListeningExercise {
  id: string;
  hskLevel: HskLevel;
  audioUrl: string;           // MP3/OGG — standard Mandarin speaker
  durationSecs: number;
  transcript?: string;        // revealed after completion
  transcriptPinyin?: string;
  questions: QuizQuestion[];  // comprehension questions
  playLimit?: number;         // null = unlimited; HSK exam mode = 2
  audioSpeed: 0.75 | 1 | 1.25 | 1.5;  // default 1
}
```

### Rules
- Audio must be standard Mandarin (普通话 pǔtōnghuà), not accented.
- Always provide a play/pause button, a progress bar, and playback speed control.
- HSK exam simulation mode: limit plays to 2 (matches real exam).
- Transcripts are hidden during practice, revealed after completion.
- Audio accessibility: `<audio>` element must have `aria-label` + transcript available via toggle.

---

## Reading

```ts
interface ReadingPassage {
  id: string;
  hskLevel: HskLevel;
  titleVi: string;
  titleEn: string;
  content: string;            // Simplified Chinese text
  contentAnnotated: AnnotatedToken[];  // click-to-look-up
  wordCount: number;
  estimatedReadingMins: number;
  topicTag: string;           // 'daily-life' | 'travel' | 'culture' | etc.
  comprehensionQuestions: QuizQuestion[];
  vocabularyHighlights: string[];  // vocab IDs featured in this passage
}

interface AnnotatedToken {
  hanzi: string;
  pinyin: string;
  meaningVi: string;
  meaningEn: string;
  vocabId?: string;           // links to Vocabulary table
}
```

### Rules
- Clicking any hanzi token shows a popup with pinyin + meaning (both VI and EN).
- Unknown words should be visually distinct (lighter color, dashed underline).
- Reading level must match declared `hskLevel` — no above-level vocabulary without annotation.
- Estimate reading time based on ~100 characters/min for HSK 1–2, ~200/min for HSK 3+.

---

## Writing

```ts
type WritingType =
  | 'stroke_order'      // trace character stroke by stroke
  | 'pinyin_input'      // type pinyin, system converts to hanzi
  | 'composition'       // free-form paragraph writing
  | 'sentence_reorder'; // arrange given words into correct sentence

interface WritingExercise {
  id: string;
  type: WritingType;
  hskLevel: HskLevel;
  targetHanzi?: string;       // character to practice (stroke_order)
  prompt?: string;            // writing prompt (composition)
  promptVi?: string;
  promptEn?: string;
  minChars?: number;          // composition minimum length
  sampleAnswer?: string;      // shown after completion
}
```

### Stroke Order Rules
- Always show animation before user traces.
- Grid: 田字格 (tián zì gé) — 4-quadrant grid is the standard for Chinese writing practice.
- Stroke order data source must be authoritative (CC-CEDICT stroke data or equivalent).
- Do not accept strokes in arbitrary order — enforce correct stroke sequence.

---

## Speaking

```ts
interface SpeakingExercise {
  id: string;
  type: 'pronunciation' | 'sentence_repeat' | 'open_response';
  hskLevel: HskLevel;
  targetText: string;          // text to pronounce
  targetPinyin: string;
  referenceAudioUrl: string;   // model pronunciation
  rubric: SpeakingRubric;
}

interface SpeakingRubric {
  tonalAccuracy: 0 | 1 | 2 | 3;     // 0–3 stars
  fluency: 0 | 1 | 2 | 3;
  completeness: 0 | 1 | 2 | 3;
}
```

### Rules
- Use Web Speech API (`SpeechRecognition`) with `lang: 'zh-CN'` for browser-based assessment.
- Always offer a fallback: "I cannot use microphone" → skip to next with partial credit.
- Show waveform visualization during recording for engagement.
- Compare tone pattern of user recording vs reference audio spectrogram (future scope).
- Privacy: never store raw audio without explicit user consent.

---

## Review

End-of-unit review sessions consolidate all lesson content.

```ts
interface ReviewSession {
  unitId: string;
  userId: string;
  vocabReviewIds: string[];      // vocab scheduled for review
  grammarReviewIds: string[];
  exerciseTypes: QuizQuestionType[];  // mixed question types
  estimatedMins: number;
  xpReward: number;
}
```

### Review Strategy
- Review triggers automatically after completing all lessons in a unit.
- Question selection: 60% vocabulary, 25% grammar, 15% listening.
- Wrong answers from previous quizzes get higher weight (appear more often).
- On completion: unlock next unit + award unit completion badge.

---

## Spaced Repetition (SRS)

### Algorithm: SM-2 (SuperMemo 2)

```ts
interface SrsCard {
  vocabId: string;
  userId: string;
  easeFactor: number;          // default 2.5; minimum 1.3
  interval: number;            // days until next review
  repetitions: number;         // number of successful recalls in a row
  dueDate: Date;               // next scheduled review
  lastReviewedAt: Date;
}

// Grade: 0 = complete blackout, 1 = wrong, 2 = hard, 3 = correct, 4 = easy, 5 = perfect
function sm2(card: SrsCard, grade: 0 | 1 | 2 | 3 | 4 | 5): SrsCard {
  const q = grade;
  let { easeFactor, interval, repetitions } = card;

  if (q < 3) {
    // Failed — reset
    repetitions = 0;
    interval = 1;
  } else {
    // Passed
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);

    easeFactor = Math.max(1.3, easeFactor + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
    repetitions += 1;
  }

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + interval);

  return { ...card, easeFactor, interval, repetitions, dueDate };
}
```

### Review Queue Rules
- Show cards due today first, then overdue (most overdue first).
- Maximum 20 new cards per day per user (configurable in user settings).
- Maximum 100 review cards per session.
- "Due today" count shown on dashboard — key motivation metric.

---

## Flashcard

```ts
interface Flashcard {
  id: string;
  userId: string;              // owner
  vocabId?: string;            // linked vocab (system card)
  frontType: 'hanzi' | 'pinyin' | 'meaning_vi' | 'meaning_en';
  backType: 'hanzi' | 'pinyin' | 'meaning_vi' | 'meaning_en' | 'audio';
  front: string;
  back: string;
  deckId: string;
  srsCard?: SrsCard;           // present when enrolled in SRS
  isCustom: boolean;           // user-created vs system-generated
  createdAt: Date;
}

interface Deck {
  id: string;
  userId: string;
  nameVi: string;
  nameEn: string;
  hskLevel?: HskLevel;
  cardCount: number;
  dueCount: number;            // computed: cards due today
  isSystem: boolean;           // true for auto-generated HSK level decks
}
```

### Rules
- System decks: one per HSK level, auto-populated as user unlocks vocabulary.
- User decks: freely created, max 500 cards per deck.
- Flashcard front/back combinations are configurable per deck.
- Support bulk import from CSV: `hanzi,pinyin,meaning_vi,meaning_en`.

---

## Dictionary

```ts
interface DictionaryEntry {
  id: string;
  hanzi: string;
  simplified: string;
  traditional?: string;
  pinyin: string;
  definitions: Definition[];    // multiple meanings
  hskLevel?: HskLevel;          // null if not in HSK curriculum
  frequency: number;
  exampleSentences: ExampleSentence[];
  relatedWords: string[];       // vocab IDs
  strokeCount: number;
  radicals: string[];
  audioUrl: string;
}

interface Definition {
  partOfSpeech: PartOfSpeech;
  meaningVi: string;
  meaningEn: string;
  usageNote?: string;
}
```

### Search Rules
- Support: hanzi search, pinyin search, Vietnamese meaning search, English meaning search.
- Fuzzy pinyin: `ni hao` should match `nǐ hǎo` (tone-insensitive mode).
- Results ranked: exact match > HSK level order > frequency rank.
- Click to add any entry to a user deck or start SRS.
- Lookup history: store last 50 lookups in `localStorage` + sync to DB for authenticated users.

---

## Progress

```ts
interface UserProgress {
  userId: string;
  hskLevel: HskLevel;

  // Lesson progress
  lessonsTotal: number;
  lessonsCompleted: number;
  lessonCompletionPct: number;   // computed

  // Vocabulary
  vocabTotal: number;            // total for this level
  vocabLearned: number;          // SRS repetitions >= 1
  vocabMastered: number;         // SRS interval >= 21 days

  // Quiz performance
  quizzesTaken: number;
  avgQuizScore: number;
  bestQuizScore: number;

  // Time
  totalStudyTimeMins: number;
  studyTimeLast7Days: number;

  // XP
  totalXp: number;
  levelXp: number;               // XP within current user level
  userLevel: number;             // 1–100 gamification level
}
```

### Progress DB — Key Tables

```
lesson_progress     userId + lessonId → status, score, completedAt
quiz_attempts       userId + quizId → score, timeTakenSecs, xpEarned
srs_cards           userId + vocabId → SM2 state (easeFactor, interval, dueDate)
user_streaks        userId → currentStreak, longestStreak, lastStudyDate
user_xp_log         userId → xp, source, earnedAt (audit log)
```

---

## Gamification

### XP Sources

| Action | XP |
|---|---|
| Complete a lesson | 10–50 (by duration) |
| Pass a quiz (≥70%) | 20–100 (by score) |
| Complete a review session | 50 |
| Daily flashcard session | 15 per 10 cards |
| Daily challenge complete | 30 |
| Perfect quiz score (100%) | +25 bonus |
| 7-day streak | +50 bonus |
| 30-day streak | +200 bonus |
| First completion of HSK level | 500 |

### User Levels (Gamification)

```ts
function xpThreshold(level: number): number {
  return Math.round(100 * Math.pow(level, 1.5));  // level 1=100, 10=3162, 50=35355
}
```

### Badges

```ts
type BadgeId =
  | 'first_lesson'          // complete first lesson
  | 'week_streak'           // 7-day study streak
  | 'month_streak'          // 30-day streak
  | 'hsk1_complete'         // all HSK1 lessons done
  | 'hsk2_complete'
  // ... HSK3–6
  | 'vocab_100'             // 100 vocab mastered
  | 'vocab_500'
  | 'vocab_1000'
  | 'quiz_ace'              // 10 perfect quiz scores
  | 'speed_learner'         // finish a quiz in top 10% time
  | 'night_owl'             // study after 10pm
  | 'early_bird';           // study before 7am
```

### Rules
- XP is immutable once awarded — log to `user_xp_log`, never edit.
- Badges are idempotent — check before awarding to avoid duplicates.
- XP and badges are cosmetic — never gate curriculum access behind them.
- Show XP animation on award (floating +XP bubble, not blocking modal).

---

## Daily Challenge

```ts
interface DailyChallenge {
  id: string;
  date: string;             // YYYY-MM-DD — same challenge for all users on this date
  hskLevel: HskLevel;       // or 'mixed' for all levels
  challengeType: 'vocab_blitz' | 'grammar_sprint' | 'listening_round' | 'reading_race';
  questions: QuizQuestion[];
  timeLimitSecs: number;
  xpReward: number;         // fixed for all users
  bonusXp: number;          // speed bonus for top finishers
}

interface DailyChallengeResult {
  userId: string;
  challengeId: string;
  score: number;
  timeTakenSecs: number;
  xpEarned: number;
  rank?: number;            // daily rank (updated async)
  completedAt: Date;
}
```

### Rules
- One challenge per day — resets at midnight (UTC+7 Vietnam Time).
- Challenge available for 24 hours only — no retroactive completion.
- Users can attempt the daily challenge exactly once.
- Show countdown timer to next day's challenge after completion.
- XP awarded even for low scores — participation > perfection.

---

## Ranking (Leaderboard)

```ts
interface LeaderboardEntry {
  userId: string;
  displayName: string;
  avatarUrl?: string;
  hskLevel: HskLevel;       // current user level
  weeklyXp: number;
  totalXp: number;
  currentStreak: number;
  rank: number;
}

type LeaderboardScope = 'weekly' | 'monthly' | 'all_time';
type LeaderboardFilter = 'global' | 'same_hsk_level';
```

### Rules
- Weekly leaderboard resets Monday 00:00 UTC+7.
- Display top 100 only. Show user's own rank even if outside top 100.
- Anonymous users are not ranked.
- Opt-out: users can hide their profile from the leaderboard in settings.
- Anti-cheat: XP from automated/scripted requests is flagged and excluded.

---

## Coding Rules

### Bilingual Content

```ts
// Always resolve locale at the data layer — components receive resolved strings
function resolveLocale<T extends { vi: string; en: string }>(obj: T, locale: string): string {
  return locale === 'vi' ? obj.vi : obj.en;
}

// DB columns: _vi / _en suffix
const title = locale === 'vi' ? lesson.title_vi : lesson.title_en;

// Never: hardcode locale check in JSX
// ❌ <h2>{locale === 'vi' ? '...' : '...'}</h2>
// ✅ <h2>{title}</h2>  (resolved before render)
```

### Domain Types

All domain types live in `src/types/domain.ts`. Never define inline in components.

```ts
// src/types/domain.ts — canonical location for all domain interfaces
export type { HskLevel, LessonType, QuizQuestionType, PartOfSpeech, ... };
```

### Audio

- Audio URLs are always absolute (full CDN URL), never relative.
- Format: MP3 (primary) + OGG (fallback) for cross-browser support.
- Use the `<audio>` element with the custom `AudioPlayer` component — never bare `<audio>`.
- Always provide `aria-label` on play buttons: `aria-label={t('playPronunciation', { word: hanzi })}`.

### Chinese Character Rendering

- Use `lang="zh-Hans"` on elements containing Chinese text for correct CJK font rendering.
- Font fallback stack: `"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif`
- Pinyin tone marks must use Unicode precomposed characters (ā á ǎ à) — not combining diacritics.

```tsx
<span lang="zh-Hans" className="font-chinese text-2xl">{hanzi}</span>
<span className="text-pinyin text-sm text-on-surface-variant">{pinyin}</span>
```

---

## Naming Rules

| Entity | DB Table | TS Type | TS Enum Value |
|---|---|---|---|
| HSK Level | `hsk_level` column | `HskLevel` | `'HSK1'` … `'HSK9'` |
| Lesson | `lessons` | `Lesson` | — |
| Lesson Progress | `lesson_progress` | `LessonProgress` | — |
| Vocabulary | `vocabulary` | `VocabularyItem` | — |
| Grammar Point | `grammar_points` | `GrammarPoint` | — |
| Quiz | `quizzes` | `Quiz` | — |
| Quiz Attempt | `quiz_attempts` | `QuizAttempt` | — |
| SRS Card | `srs_cards` | `SrsCard` | — |
| Flashcard | `flashcards` | `Flashcard` | — |
| Deck | `flashcard_decks` | `Deck` | — |
| Daily Challenge | `daily_challenges` | `DailyChallenge` | — |
| Ranking Entry | `leaderboard_entries` | `LeaderboardEntry` | — |
| User Streak | `user_streaks` | `UserStreak` | — |
| XP Log | `user_xp_log` | `XpLogEntry` | — |

**Function naming:**
```ts
getPublishedLessons(level, locale)      // fetch
getLessonBySlug(slug)                   // fetch single
getUserProgress(userId, level)          // fetch user data
markLessonComplete(userId, lessonId)    // mutation
awardXp(userId, amount, source)         // gamification mutation
updateSrsCard(card, grade)              // SRS update
```

**Component naming:**
```
LessonCard, LessonViewer, LessonProgress → lesson/
QuizQuestion, QuizTimer, QuizResult     → quiz/
FlashcardViewer, FlashcardDeck          → flashcard/
VocabPopup, VocabCard, VocabAudio       → vocabulary/
StreakBadge, XpBar, UserLevel           → gamification/
DailyChallengeBanner, ChallengeResult   → challenge/
Leaderboard, LeaderboardRow             → ranking/
```

---

## Future Scalability

### Feature Flags

Gate unreleased features with feature flags — never deploy unfinished features without a flag:

```ts
// src/lib/constants/features.ts
export const FEATURES = {
  SPEAKING_RECOGNITION: process.env.NEXT_PUBLIC_FEATURE_SPEAKING === 'true',
  HSK7_9_CONTENT: process.env.NEXT_PUBLIC_FEATURE_HSK789 === 'true',
  SOCIAL_FEATURES: process.env.NEXT_PUBLIC_FEATURE_SOCIAL === 'true',
  AI_TUTOR: process.env.NEXT_PUBLIC_FEATURE_AI_TUTOR === 'true',
} as const;
```

### Planned Features (design for extensibility)

| Feature | Status | Design Note |
|---|---|---|
| Speaking recognition | Future | Web Speech API; keep `SpeakingExercise` type ready |
| HSK 7–9 content | Future | `HskLevel` enum already includes 7–9 |
| AI tutor chatbot | Future | `lesson_messages` table will be added |
| Social / study groups | Future | `study_groups` + `group_members` tables |
| Parent/teacher dashboard | Future | `managed_users` relation |
| Offline mode (PWA) | Future | `manifest.ts` already configured |
| Certificate generation | Future | `certificates` table keyed to level completion |
| Live class scheduling | Future | `class_schedules` + `enrollment` |

### Content Management

- All curriculum content (lessons, vocab, grammar) lives in the DB — not hardcoded files.
- Admin panel will allow adding/editing content without code changes.
- Content versioning: add `version: Int @default(1)` to Lesson and GrammarPoint for curriculum updates.

### Performance at Scale

- Vocab lookups: add full-text search index on `hanzi`, `pinyin`, `meaning_vi`, `meaning_en`.
- Leaderboard: compute weekly XP via DB aggregate on a cron job (not per-request).
- Audio files: serve from CDN, not Supabase Storage directly.
- SRS due cards: indexed on `(user_id, due_date)` for fast dashboard query.

---

## Checklist

**Adding a new content type (e.g. Grammar, Listening):**
- [ ] Domain interface defined in `src/types/domain.ts`
- [ ] DB table created with `_vi`/`_en` bilingual columns
- [ ] `is_published`, `sort_order`, `deleted_at`, `created_at`, `updated_at` columns present
- [ ] Repository function created in `src/lib/repositories/`
- [ ] XP reward defined for completing this content type
- [ ] Progress tracking table/column added for user completion state
- [ ] Translation keys added to `vi.json` AND `en.json` simultaneously

**Adding a vocabulary item:**
- [ ] `hanzi`, `pinyin`, `meaning_vi`, `meaning_en` all present
- [ ] `hsk_level` set correctly
- [ ] `audio_url` is a valid, accessible URL
- [ ] `part_of_speech` set from the approved enum
- [ ] At least one `example_sentence` with translation

**Adding a quiz question:**
- [ ] `question_type` is one of the approved `QuizQuestionType` values
- [ ] All distractors (wrong answers) are plausible, same part of speech
- [ ] Correct answer is unambiguous
- [ ] `explanation_vi` provided for the correct answer
- [ ] Mapped to a `lesson_id` or `unit_id`

**Gamification:**
- [ ] XP awarded via `awardXp(userId, amount, source)` — never direct DB insert
- [ ] Badge award is idempotent (check before insert)
- [ ] XP is logged to `user_xp_log` (never mutated, only appended)
- [ ] Streak updated after any study action

**Naming:**
- [ ] DB columns are `snake_case` with `_vi`/`_en` suffix for bilingual fields
- [ ] TS types are in `src/types/domain.ts`
- [ ] Components follow `[Feature][Component].tsx` naming
- [ ] Repository functions follow `verb + noun` convention

**Bilingual content:**
- [ ] All user-facing strings have both `_vi` and `_en` versions
- [ ] Locale resolution happens at the data layer (repository), not in JSX
- [ ] `lang="zh-Hans"` on all elements containing Chinese characters
- [ ] Pinyin uses Unicode tone marks (ā á ǎ à), not numeric (a1 a2 a3 a4)
