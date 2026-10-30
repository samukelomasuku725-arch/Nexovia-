/**
 * Nexovia Academy Server Entry Point
 * 
 * Supports both development (tsx server.ts) and production deployment (node server.ts)
 * across container environments.
 */
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import {
  getFromCache,
  saveToCache,
  deleteFromCache,
  incrementAiCallsSaved,
  getAiCallsSaved,
  type CachedQuestionItem
} from './server/cache.ts';
import {
  readFeedbackFile,
  saveFeedback,
  deleteFeedback,
  type FeedbackItem
} from './server/feedback.ts';

export {
  getFromCache,
  saveToCache,
  deleteFromCache,
  incrementAiCallsSaved,
  getAiCallsSaved,
  type CachedQuestionItem,
  readFeedbackFile,
  saveFeedback,
  deleteFeedback,
  type FeedbackItem
};

const isTsxRunning = Boolean(
  process.env.__TSX_BOOTSTRAPPED__ ||
  process.execArgv.some((a) => a.includes('tsx'))
);

if (!isTsxRunning) {
  const currentFile = fileURLToPath(import.meta.url);
  const child = spawn(process.execPath, ['--import', 'tsx', currentFile, ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, __TSX_BOOTSTRAPPED__: 'true' }
  });

  child.on('exit', (code, signal) => {
    process.exit(code ?? (signal ? 1 : 0));
  });

  process.on('SIGINT', () => child.kill('SIGINT'));
  process.on('SIGTERM', () => child.kill('SIGTERM'));
} else {
  await import('./server/app.ts');
}

