# SKILL.md

## Objective

The primary purpose of revising any existing Markdown document is **to transform information into understanding**.

The document should not merely present facts or instructions. It should function as a guided explanation that helps the reader gradually understand **what something means, why it matters, and how each idea connects to the next**.

The ideal outcome is that a reader with no prior knowledge can follow the explanation naturally and eventually understand the topic without relying on memorization.

The writing approach should resemble someone who deeply understands the subject at its core — someone who can explain difficult ideas in simple ways because they understand the principles behind them, not because they repeat technical terminology.

---

## Core Writing Principles

### 1. Teach, Do Not Simply Inform

Rewrite content with the mindset of a teacher rather than a summarizer.

Avoid only stating facts, definitions, or steps. Instead:

- Explain **what something is**
- Explain **why it exists**
- Explain **why it matters**
- Explain **how it relates to concepts that will appear later**

Every section should help prepare the reader for the next section.

Good writing should feel like a conversation where ideas naturally build upon one another.

#### Example of Weak Writing

```md
### API

API stands for Application Programming Interface. It allows systems to communicate with each other.
```

This provides information, but little understanding.

#### Example of Better Writing

```md
### API

When two systems need to work together, they require a shared way to exchange information.

Imagine ordering food at a restaurant. You speak to the waiter instead of entering the kitchen directly. The waiter becomes the bridge between you and the kitchen.

An API works in a similar way. It acts as an intermediary that allows one system to ask another system for something without needing to know how the internal system works.

This idea becomes important later when discussing system architecture, because many modern applications are built from multiple services communicating through APIs.
```

The second example teaches through explanation, analogy, and continuity.

---

### 2. Prioritize Understanding Over Technical Complexity

Use language that is:

- Clear
- Natural
- Easy to understand
- Appropriate to the reader's likely knowledge level

Avoid unnecessary technical language.

If technical terminology is necessary:

1. Introduce it gradually
2. Explain it in simple language
3. Provide intuition or examples
4. Clarify why the term matters

The reader should never feel forced to already understand specialized vocabulary.

#### Avoid

```md
The asynchronous event-driven architecture facilitates non-blocking execution.
```

#### Prefer

```md
Instead of waiting for one task to finish before starting another, the system can continue working on other tasks at the same time.

This approach is often called an "asynchronous" system, meaning tasks can happen independently without forcing everything to pause and wait.
```

The explanation should reduce confusion, not increase it.

---

### 3. Explain Meaning, Not Just Structure

Every concept contains layers.

Do not only describe **what exists**.

Also explain:

- Why the element exists
- What role it plays
- What problem it solves
- Why the reader should care
- How it connects to the broader topic

A document becomes easier to understand when readers can see the purpose behind each component.

#### Example

Instead of:

```md
Markdown headings use `#`, `##`, and `###`.
```

Prefer:

```md
Headings in Markdown create structure.

Think of them as signs that help readers understand where they are in the explanation.

A top-level heading (`#`) usually represents the main topic. Smaller headings (`##`, `###`) break ideas into smaller parts so readers can process information step by step rather than all at once.
```

---

### 4. Build Logical Continuity Between Sections

Each section should feel connected.

The reader should understand:

- Why this topic is being introduced now
- How it connects to the previous section
- What it prepares them to understand next

Avoid abrupt topic switching.

Use transitional explanations when appropriate.

#### Example

Instead of:

```md
## Database

...

## Authentication

...
```

Prefer:

```md
Now that we understand how information is stored, the next question becomes:

How do we control who can access that information?

This leads naturally into authentication.
```

The reader should feel guided, not interrupted.

---

### 5. Write for People With No Prior Knowledge

Assume the reader may know nothing about the topic.

Avoid hidden assumptions.

Before introducing advanced ideas:

- Establish fundamentals
- Define important concepts
- Give context
- Use relatable examples when useful

Complex topics should feel approachable.

The goal is not to impress knowledgeable readers with complexity.

The goal is to help unfamiliar readers genuinely understand.

---

### 6. Prefer Explanation Through Reasoning

Do not rely only on statements.

Where appropriate, explain the reasoning behind conclusions.

Instead of saying:

```md
Caching improves performance.
```

Explain:

```md
Fetching the same information repeatedly can waste time.

Caching improves performance because the system temporarily remembers recently used information. Instead of repeating expensive work, it can reuse something already available.

This reduces waiting time and makes applications feel faster to users.
```

Reasoning helps readers build intuition.

---

### 7. Maintain Consistent Formatting

Formatting should support readability and remain consistent across the document.

Use a predictable hierarchy.

Recommended structure:

```md
# Main Topic

Brief introduction

## Section

Explanation paragraph

### Important Idea

Supporting explanation

- Key points
- Related ideas

#### Example

Concrete example
```

Guidelines:

- Keep heading levels consistent
- Avoid random formatting changes
- Use lists for clarity
- Use examples intentionally
- Keep spacing readable
- Avoid overly dense paragraphs

Formatting should help readers think clearly.

---

### 8. Use Examples With Purpose

Examples should clarify understanding, not merely decorate content.

A good example should:

- Simplify abstraction
- Build intuition
- Connect unfamiliar ideas to familiar experiences
- Reinforce the explanation

Prefer realistic and relatable comparisons when useful.

Avoid examples that create more confusion than clarity.

---

### 9. Write With Calm Confidence

The tone should feel:

- Knowledgeable
- Thoughtful
- Clear
- Patient

Avoid sounding:

- Robotic
- Overly academic
- Excessively technical
- Overly dramatic

The writing should feel like learning from someone experienced who genuinely understands the subject deeply and can explain it simply.

---

## Translation Guidelines

When converting a document into another language, translation should prioritize **meaning, context, and natural communication**.

Do not translate mechanically or word-for-word.

The goal is to preserve the original intent while adapting language appropriately for the target audience.

### Translation Principles

#### Understand Context First

Before translating:

- Understand the topic
- Understand the audience
- Understand cultural and linguistic expectations
- Understand technical nuance if relevant

Meaning should be interpreted before language is converted.

---

#### Translate Like an Experienced Human Translator

The translated document should read naturally in the target language.

Avoid robotic phrasing.

Preserve:

- Meaning
- Tone
- Intent
- Clarity
- Readability

Adapt wording when direct translation feels unnatural.

A good translation should feel originally written in that language.

---

#### Avoid Literal Translation

Do not directly mirror sentence structures when they sound unnatural.

#### Avoid

```text
The system makes a request.
→ ระบบทำการสร้างคำร้องขอ
```

#### Prefer

```text
The system sends a request.
→ ระบบส่งคำขอ
```

The wording should match how fluent speakers naturally communicate.

---

#### Preserve Educational Clarity

If the original document teaches through reasoning and gradual explanation, the translated version must preserve the same teaching experience.

Do not compress explanations unnecessarily.

The reader in another language should understand the topic just as clearly as the original audience.

---

## Final Standard

A revised Markdown document should make readers feel:

> “I understand why this works, not just what it says.”

Success is measured by understanding, clarity, and continuity — not by complexity or technical sophistication.
