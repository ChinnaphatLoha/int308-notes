# INT308 Notes

Study notes and a lightweight quiz app for the INT308 course.

This repository contains reference notes (English and Thai short notes) and a small Next.js-based quiz application generated from JSON question banks.

Quick: run the quiz app locally

Open a terminal and go to the app folder:

```bash
cd quiz-app
npm install
npm run dev
```

Open your browser at http://localhost:3000.

Notes: The app uses the JSON files in `quiz-app/data/` as question banks. Edit or add JSON files there to change quizzes.

How to request changes, features or updates

Please open an issue on GitHub: https://github.com/ChinnaphatLoha/int308-notes/issues/new

Suggested issue templates (copy/paste into the new issue body):

Feature request

```
Title: Feature: [short description]

Describe the feature you want and why it helps:
- What: (describe the change)
- Why: (motivation / expected benefit)
- Suggested implementation or UI notes (optional):

Add any mockups, screenshots, or links if helpful.
```

Documentation improvement

```
Title: Docs: [file or topic]

Which doc to update (path or topic):
- Current problem or missing info:
- Proposed change or example text:

Attach a short PR or paste the suggested text directly in the issue.
```

Quiz update (question bank)

```
Title: Quiz: [quiz slug or topic] - Update

Which quiz file (e.g. `quiz-app/data/data-center.json`):
- What to change (add / fix / remove questions). Include full JSON snippet or attach a file.
- If adding questions, include question text, choices, correct answer id, section, and difficulty.

If you prefer, you can also open a PR that updates the JSON file directly; maintain the same shape as existing quiz files.
```

Maintainers: Please use labels `feature`, `docs`, or `quiz` when triaging issues.

Thanks — contributions and issue reports are welcome.
