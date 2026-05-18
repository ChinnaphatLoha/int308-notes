import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import type { QuizCollection, QuizFile } from '@/types/quiz';

const DATA_DIR = path.join(process.cwd(), 'data');
const choiceIds = new Set(['A', 'B', 'C', 'D', 'E']);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function assertQuizFile(value: unknown, fileName: string): asserts value is QuizFile {
  if (!isRecord(value)) {
    throw new Error(`${fileName} must contain a JSON object.`);
  }

  const source = value.source;
  const quiz = value.quiz;
  const questions = value.questions;
  const coverage = value.coverage;

  if (!isRecord(source) || typeof source.file !== 'string' || typeof source.title !== 'string') {
    throw new Error(`${fileName} has an invalid source block.`);
  }

  if (!isRecord(quiz) || typeof quiz.title !== 'string' || quiz.choiceCount !== 5) {
    throw new Error(`${fileName} must declare quiz.title and quiz.choiceCount = 5.`);
  }

  if (!Array.isArray(questions) || questions.length === 0) {
    throw new Error(`${fileName} must include at least one question.`);
  }

  for (const question of questions) {
    if (!isRecord(question)) {
      throw new Error(`${fileName} contains an invalid question object.`);
    }

    if (
      typeof question.id !== 'string' ||
      typeof question.section !== 'string' ||
      typeof question.question !== 'string' ||
      typeof question.correctChoiceId !== 'string' ||
      !choiceIds.has(question.correctChoiceId)
    ) {
      throw new Error(`${fileName} contains a question with missing required fields.`);
    }

    if (!Array.isArray(question.choices) || question.choices.length !== 5) {
      throw new Error(`${fileName}:${question.id} must have exactly 5 choices.`);
    }
  }

  if (!Array.isArray(coverage)) {
    throw new Error(`${fileName} must include a coverage array.`);
  }
}

function toSlug(fileName: string) {
  return fileName.replace(/\.json$/i, '');
}

export async function loadQuizCollections(): Promise<QuizCollection[]> {
  const entries = await readdir(DATA_DIR, { withFileTypes: true });
  const jsonFiles = entries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.json'))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  const quizzes = await Promise.all(
    jsonFiles.map(async (fileName) => {
      const filePath = path.join(DATA_DIR, fileName);
      const raw = await readFile(filePath, 'utf8');
      const parsed = JSON.parse(raw) as unknown;
      assertQuizFile(parsed, fileName);

      return {
        ...parsed,
        slug: toSlug(fileName),
        fileName,
        questionCount: parsed.questions.length,
        sectionCount: parsed.coverage.length
      };
    })
  );

  return quizzes.sort((a, b) => a.quiz.title.localeCompare(b.quiz.title));
}
