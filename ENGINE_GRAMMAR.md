# ENGINE_GRAMMAR — HiveStrength

<GrapplerHook>
engine: HiveStrength
version: 1.0.0
governance: QueenBee.MasterGrappler
safety: enabled
multilingual: pending
premium: false
</GrapplerHook>

## Engine Identity
- **Name:** HiveStrength
- **Domain:** hivestrengthmastery.hive.baby
- **Repo:** saggarsonny-boop/hive-strength-mastery
- **Status:** Live
- **Stack:** Next.js + TypeScript + Anthropic SDK (claude-opus-4-5)

## Purpose
AI-powered strength and fitness coaching. Inputs age, experience, goal, and current performance; outputs a precise, evidence-based coaching response. Cuts through fitness misinformation with direct, specific, practical guidance.

## Inputs
- Free-text: age, experience level, current performance, goal, specific question or plateau
- No structured form required — natural language parsing

## Outputs
- Specific, actionable coaching response
- Protocol: rep schemes, load percentages, weekly structure where relevant
- Rationale: why this works (brief, never lecturing)
- Red flags: signs to stop and consult a professional

## Modes
- **Coaching:** General strength and fitness guidance
- **Plateau:** Specific plateau-breaking protocol
- **Programme:** Basic programme structure for stated goal
- **Injury context:** Modified approach with appropriate safety framing

## Reasoning Steps
1. Parse: age, experience, current performance, goal, specific question
2. Identify: novice / intermediate / advanced based on stated numbers and context
3. Generate: protocol appropriate to level, goal, and any stated constraints
4. Rationale: one or two sentences on the mechanism
5. Flag: any injury history signals → add appropriate safety note

## Safety Templates
- If injury mentioned: "For any existing injury, consult a physiotherapist or sports medicine doctor before following this protocol."
- Cardiac signals (chest pain, dizziness): "Stop exercise immediately. Consult your GP before continuing."
- General: "This is not medical advice. Always train within your capabilities."

## Multilingual Ribbon
- Status: pending
- Target: English, Spanish, Portuguese, French, German, Arabic minimum
- MLLR integration: post-QB deployment

## Premium Locks
- None currently. Future Pro: programme builder, progress tracking, coach feedback integration.

## Governance Inheritance
- Governed by: QueenBee.MasterGrappler (pending)
- Safety level: standard
- Output schema: coaching-response
- Tone: warm

## API Model Strings
- Primary: `claude-opus-4-5`

## Deployment Notes
- Vercel: auto-deploy on push to main
- Domain: hivestrengthmastery.hive.baby → Cloudflare CNAME → cname.vercel-dns.com
- Deployment Protection: OFF
