import type {
  EngineIntentId,
  EngineResponse,
  UserProfile,
  SessionContext,
  ExerciseContext,
  SetbackContext,
} from "./strengthMasteryConfig";
import { PROMPTS } from "./strengthMasteryConfig";

export type EnginePayload =
  | { intent: "explain_exercise"; exerciseName: string; userProfile?: Partial<UserProfile> }
  | { intent: "explain_movement_pattern"; pattern: string; experienceLevel?: string }
  | { intent: "design_session"; userProfile: Partial<UserProfile>; sessionContext: Partial<SessionContext> }
  | { intent: "fix_form_issue"; exerciseContext: ExerciseContext }
  | { intent: "reframe_setback"; setbackContext: SetbackContext };

export async function callEngine(payload: EnginePayload): Promise<EngineResponse> {
  const intentId = payload.intent as EngineIntentId;

  try {
    const response = await fetch("/api/engine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ intentId, payload }),
    });
    const data = await response.json();
    return data as EngineResponse;
  } catch (err) {
    console.error("Engine call failed:", err);
    return {
      intent: "error",
      content: { message: "Something went wrong. Please try again." },
    };
  }
}
