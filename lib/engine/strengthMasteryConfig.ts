// ============================================================
// HiveStrengthMastery Engine Config
// engine_id: hive_strength_mastery
// version: 1.0.0
// ============================================================

export const ENGINE_IDENTITY = {
  engine_id: "hive_strength_mastery",
  display_name: "Hive Strength Mastery",
  version: "1.0.0",
  description:
    "A strength coaching engine that teaches movement from first principles. Personalized, shame-free, and built on biomechanics — not trends.",
};

export type ExperienceLevel = "beginner" | "returning" | "intermediate" | "advanced";
export type PrimaryGoal = "strength" | "hypertrophy" | "longevity" | "just_get_started";
export type Equipment = "full_gym" | "home_basic" | "minimal" | "bodyweight_only";
export type EnergyLevel = "low" | "medium" | "high";

export interface UserProfile {
  experienceLevel: ExperienceLevel;
  primaryGoal: PrimaryGoal;
  equipment: Equipment;
  injuriesOrConstraints: string[];
  daysPerWeek: number;
  minutesPerSession: number;
}

export interface SessionContext {
  energyLevel: EnergyLevel;
  sorenessAreas: string[];
  timeAvailable: number;
  moodNote?: string;
}

export interface ExerciseContext {
  exerciseName: string;
  bodyRegion?: string;
  reportedIssue?: string;
  painLocation?: string;
  videoUrl?: string;
  jointAngleData?: unknown;
}

export interface SetbackContext {
  description: string;
}

export type EngineIntentId =
  | "explain_exercise"
  | "explain_movement_pattern"
  | "design_session"
  | "fix_form_issue"
  | "reframe_setback";

export interface EngineIntent {
  id: EngineIntentId;
  label: string;
  requiredInputs: string[];
  optionalInputs: string[];
}

export type EngineResponse =
  | { intent: "explain_exercise"; content: ExerciseExplanation }
  | { intent: "explain_movement_pattern"; content: MovementPatternExplanation }
  | { intent: "design_session"; content: SessionPlan }
  | { intent: "fix_form_issue"; content: FormIssueAnalysis }
  | { intent: "reframe_setback"; content: SetbackReframe }
  | { intent: "error"; content: { message: string } };

export interface ExerciseExplanation {
  exerciseName: string;
  plainSummary: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  jointsInvolved: string[];
  commonMistakes: string[];
  corrections: string[];
  cuesToRemember: string[];
  riskFlags: string[];
}

export interface MovementPatternExplanation {
  pattern: string;
  whyItMatters: string;
  keyExamples: string[];
  commonWeaknesses: string[];
  howToTrain: string;
}

export interface SessionPlan {
  goal: string;
  durationMinutes: number;
  warmUp: string[];
  exercises: ExerciseBlock[];
  techniqueFocus: string;
  patternsCovered: string[];
  notes: string;
}

export interface ExerciseBlock {
  name: string;
  sets: number;
  repsOrDuration: string;
  rpe?: string;
  techniqueNote: string;
  alternative?: string;
}

export interface FormIssueAnalysis {
  exercise: string;
  possibleCauses: string[];
  adjustments: string[];
  saferVariations: string[];
  disclaimer: string;
}

export interface SetbackReframe {
  reframe: string;
  normalization: string;
  microPlan: string[];
  firstStep: string;
}

export const INTENTS: Record<EngineIntentId, EngineIntent> = {
  explain_exercise: {
    id: "explain_exercise",
    label: "Teach me this exercise",
    requiredInputs: ["exerciseName"],
    optionalInputs: ["experienceLevel", "injuriesOrConstraints"],
  },
  explain_movement_pattern: {
    id: "explain_movement_pattern",
    label: "Explain a movement pattern",
    requiredInputs: ["pattern"],
    optionalInputs: ["experienceLevel"],
  },
  design_session: {
    id: "design_session",
    label: "Design my session",
    requiredInputs: ["primaryGoal", "equipment", "timeAvailable"],
    optionalInputs: ["experienceLevel", "injuriesOrConstraints", "energyLevel", "sorenessAreas"],
  },
  fix_form_issue: {
    id: "fix_form_issue",
    label: "Something feels wrong",
    requiredInputs: ["exerciseName", "reportedIssue"],
    optionalInputs: ["painLocation", "experienceLevel"],
  },
  reframe_setback: {
    id: "reframe_setback",
    label: "I fell off",
    requiredInputs: ["description"],
    optionalInputs: [],
  },
};

export const SYSTEM_BASE = `You are an expert strength coach and biomechanics educator.
Your tone is direct, warm, and shame-free. You explain things clearly without jargon unless you define it.
You are evidence-informed but intellectually modest.
You never diagnose medical conditions. You never prescribe rehab protocols. You never reference body appearance or aesthetics.
If something warrants medical attention, you say clearly: "This is worth checking with a physio or doctor" and nothing more.
You never shame someone for their fitness level, history, or setbacks.`;

export const PROMPTS: Record<EngineIntentId, {
  system: string;
  developer: string;
  userTemplate: (payload: unknown) => string;
}> = {
  explain_exercise: {
    system: SYSTEM_BASE,
    developer: `Respond with a JSON object matching this shape exactly:
{
  "exerciseName": string,
  "plainSummary": string,
  "primaryMuscles": string[],
  "secondaryMuscles": string[],
  "jointsInvolved": string[],
  "commonMistakes": string[],
  "corrections": string[],
  "cuesToRemember": string[],
  "riskFlags": string[]
}
No markdown. No prose outside the JSON.`,
    userTemplate: (payload: unknown) => {
      const p = payload as { exerciseName: string; userProfile?: Partial<UserProfile> };
      return `Exercise: ${p.exerciseName}
${p.userProfile?.experienceLevel ? `Experience level: ${p.userProfile.experienceLevel}` : ""}
${p.userProfile?.injuriesOrConstraints?.length ? `Constraints: ${p.userProfile.injuriesOrConstraints.join(", ")}` : ""}
Explain this exercise from first principles.`;
    },
  },
  explain_movement_pattern: {
    system: SYSTEM_BASE,
    developer: `Respond with a JSON object:
{
  "pattern": string,
  "whyItMatters": string,
  "keyExamples": string[],
  "commonWeaknesses": string[],
  "howToTrain": string
}
No markdown. No prose outside the JSON.`,
    userTemplate: (payload: unknown) => {
      const p = payload as { pattern: string; experienceLevel?: ExperienceLevel };
      return `Movement pattern: ${p.pattern}
${p.experienceLevel ? `User experience: ${p.experienceLevel}` : ""}
Explain why this pattern matters and how to train it well.`;
    },
  },
  design_session: {
    system: SYSTEM_BASE,
    developer: `Respond with a JSON object:
{
  "goal": string,
  "durationMinutes": number,
  "warmUp": string[],
  "exercises": [
    {
      "name": string,
      "sets": number,
      "repsOrDuration": string,
      "rpe": string,
      "techniqueNote": string,
      "alternative": string
    }
  ],
  "techniqueFocus": string,
  "patternsCovered": string[],
  "notes": string
}
No markdown. No prose outside the JSON.`,
    userTemplate: (payload: unknown) => {
      const p = payload as { userProfile: Partial<UserProfile>; sessionContext: Partial<SessionContext> };
      return `Goal: ${p.userProfile?.primaryGoal ?? "general fitness"}
Equipment: ${p.userProfile?.equipment ?? "full_gym"}
Time available: ${p.sessionContext?.timeAvailable ?? p.userProfile?.minutesPerSession ?? 45} minutes
Experience level: ${p.userProfile?.experienceLevel ?? "beginner"}
Injuries or constraints: ${p.userProfile?.injuriesOrConstraints?.join(", ") || "none"}
Energy level today: ${p.sessionContext?.energyLevel ?? "medium"}
Soreness: ${p.sessionContext?.sorenessAreas?.join(", ") || "none"}
${p.sessionContext?.moodNote ? `Notes from user: ${p.sessionContext.moodNote}` : ""}
Design a complete strength session.`;
    },
  },
  fix_form_issue: {
    system: SYSTEM_BASE,
    developer: `Respond with a JSON object:
{
  "exercise": string,
  "possibleCauses": string[],
  "adjustments": string[],
  "saferVariations": string[],
  "disclaimer": "This is technique guidance only, not medical advice. If pain persists or is sharp, see a physio or doctor."
}
No markdown. No prose outside the JSON.`,
    userTemplate: (payload: unknown) => {
      const p = payload as ExerciseContext;
      return `Exercise: ${p.exerciseName}
What feels wrong: ${p.reportedIssue}
${p.painLocation ? `Where it feels off: ${p.painLocation}` : ""}
${p.bodyRegion ? `Body region: ${p.bodyRegion}` : ""}
What are likely technique causes and adjustments? Do not diagnose.`;
    },
  },
  reframe_setback: {
    system: SYSTEM_BASE,
    developer: `Respond with a JSON object:
{
  "reframe": string,
  "normalization": string,
  "microPlan": string[],
  "firstStep": string
}
No markdown. No prose outside the JSON.`,
    userTemplate: (payload: unknown) => {
      const p = payload as SetbackContext;
      return `What happened: ${p.description}
Help this person get back on track without shame or toxic positivity.`;
    },
  },
};
