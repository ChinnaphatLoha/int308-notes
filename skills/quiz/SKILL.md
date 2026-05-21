# SKILL.md

## Purpose

This skill is for generating high-quality multiple-choice quizzes in JSON format from one or more study documents.

The output is not a generic summary, a worksheet, or a list of trivia questions. It is a structured quiz dataset designed for a quiz app, where each question tests real understanding of the material and each explanation teaches the reasoning behind the correct answer.

The writing should be in English unless the user explicitly asks for another language.

---

## Core Goal

Create quiz data that:

- follows the JSON structure used by the existing quiz files
- uses knowledge from the full source material, not just obvious definitions
- includes both direct and applied questions when appropriate
- uses plausible distractors that can fool partial understanding
- gives explanations that truly teach, not just reveal the answer

The quiz should reward comprehension, not blind memorization.

---

## Output Format

Match this structure exactly unless the user asks for a different schema:

```json
{
	"version": "1.0",
	"source": {
		"file": "path/to/source.md",
		"title": "Source Title"
	},
	"quiz": {
		"title": "Quiz Title",
		"choiceCount": 5
	},
	"questions": [
		{
			"id": "topic-001",
			"section": "Section Name",
			"topic": "Question Topic",
			"difficulty": "easy",
			"question": "Question text",
			"choices": [
				{ "id": "A", "text": "Choice text" },
				{ "id": "B", "text": "Choice text" },
				{ "id": "C", "text": "Choice text" },
				{ "id": "D", "text": "Choice text" },
				{ "id": "E", "text": "Choice text" }
			],
			"correctChoiceId": "A",
			"explanation": "Real explanation of why this answer is correct and why the idea matters.",
			"source": {
				"file": "path/to/source.md",
				"lines": "10-15"
			},
			"tags": ["tag-one", "tag-two"]
		}
	]
}
```

### Required Structure Rules

- `version` should normally be `1.0`
- `quiz.choiceCount` should match the actual number of choices
- each question should normally have 5 choices with IDs `A` to `E`
- each question must have exactly one correct answer
- `difficulty` should use stable labels such as `easy`, `medium`, or `hard`
- `source.lines` should point to the relevant lines that support the question
- `tags` should be short, reusable, and topic-focused

---

## Working Process

Use this process in order.

### 1. Understand the full material first

Read the full set of source documents before writing questions.

Do not generate questions from isolated sentences alone.

First identify:

- the main concepts
- the relationships between concepts
- common points of confusion
- details that can support applied reasoning
- which ideas are foundational and which are advanced

The quiz should reflect the whole knowledge space of the material, not just the easiest facts to extract.

### 2. Decide the question mix

Build a mix of question types appropriate to the material:

- direct understanding questions
- concept comparison questions
- cause-and-effect questions
- applied or scenario-based questions
- inference questions that require one extra step of thinking

Do not make every question a definition check.

If the material supports it, include questions that distinguish between:

- similar concepts
- correct principle vs tempting shortcut
- surface knowledge vs actual understanding

### 3. Write strong distractors

Wrong answers must be believable.

Each distractor should be:

- related to the same topic
- similar in length and specificity to the correct choice
- plausible to someone who memorized keywords without understanding
- wrong for a clear reason

Avoid distractors that are obviously absurd, too short, too vague, or from a completely unrelated domain.

Avoid making the correct choice stand out because it is more precise, longer, or more polished than the others.

### 4. Write explanations that teach

The explanation must do more than identify the correct choice.

A good explanation should:

- explain why the correct answer is correct
- clarify the underlying concept or reasoning
- distinguish it from the tempting wrong ideas when useful
- help the learner avoid the same mistake later

Explanations should feel like mini-teaching notes, not answer keys.

### 5. Verify balance and consistency

Before finalizing, check:

- the question is answerable from the source material
- the answer key is unambiguous
- the distractors are balanced
- the difficulty label is appropriate
- the wording does not accidentally reveal the answer
- the explanation is genuinely informative

---

## Question Design Principles

### 1. Never mention the document itself

Do not refer to the source as a document, article, notes, chapter, slide, lesson, or reference.

Do not ask questions like:

- "According to the document..."
- "Which example appears in the notes?"
- "What does the chapter say about...?"

Do not mention examples merely because they appeared in the source.

Questions must test the underlying knowledge, not whether the learner remembers how the source was written.

### 2. Use the knowledge, not the wording

Base questions on the ideas in the material, but do not simply copy sentences and turn them into blanks.

Prefer questions that show understanding of:

- meaning
- purpose
- mechanism
- comparison
- implication
- practical use

You may ask directly when a concept is fundamental, but the quiz should not feel like sentence matching.

### 3. Match difficulty to cognitive effort

Use difficulty intentionally.

`easy`:

- core facts
- basic meanings
- straightforward recognition

`medium`:

- concept comparison
- interpretation
- applied understanding

`hard`:

- subtle distinctions
- multi-step reasoning
- scenario judgment based on principles in the material

Difficulty should come from thinking, not from confusing wording.

### 4. Keep choices parallel

Choices should look structurally comparable.

Aim for similar:

- length
- grammatical shape
- level of detail
- tone

If one choice is much more specific or much more polished than the others, revise it.

### 5. Preserve conceptual fairness

A question may be challenging, but it should still be fair.

Do not rely on:

- trick wording
- hidden exceptions not supported by the source
- ambiguous absolutes unless the concept truly depends on them
- choices where multiple answers are partly true but only one is artificially "most correct"

The learner should be rewarded for understanding the material, not for guessing what the quiz writer intended.

---

## Writing Rules

### Question wording

- Use clear English
- Keep the question focused on one main idea
- Avoid unnecessary complexity
- Prefer natural wording over textbook phrasing

### Choice wording

- Keep all choices plausible within the topic
- Keep the lengths reasonably similar
- Avoid joke answers or obviously wrong extremes
- Avoid repeating the exact wording of the correct concept too visibly

### Explanation wording

- Write full explanations, not fragments
- Explain the reasoning behind the answer
- Mention why a nearby misconception is wrong when that helps learning
- Keep the tone instructional and precise

### Source references

- Include supporting file path and line range
- Use the most relevant lines, not random broad spans
- Ensure the cited lines are enough to justify the answer

---

## Recommended Quality Standard

A strong question should make a learner think:

- "I need to understand the concept, not just remember a phrase."

A strong explanation should make a learner think:

- "Now I understand why that answer is right and why the others were tempting."

If a question can be solved by spotting the longest choice, the most formal choice, or the one that sounds copied from the source, it is not good enough.

---

## Final Checklist

Before delivering the quiz, verify all of the following:

- the JSON is valid
- the schema matches the expected format
- every question has one correct answer
- choice IDs are consistent
- choice lengths are reasonably balanced
- no question mentions the document or examples from the document as document artifacts
- questions use knowledge from across the source material
- explanations genuinely teach the concept
- difficulty labels are sensible
- source file and line references are accurate

If any item fails, revise before final output.
