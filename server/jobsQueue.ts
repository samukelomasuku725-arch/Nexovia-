/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIA ACADEMY - BACKGROUND JOBS & QUEUE SYSTEM
 * 
 * Scalable asynchronous job queue for long-running / expensive tasks:
 * - Asynchronous batch assessment marking
 * - AI study plan generation
 * - POPIA / GDPR data export bundling
 * - Performance analytics aggregation
 * 
 * In development / single-instance: In-memory concurrency-controlled worker queue.
 * In production: Maps seamlessly to pg-boss, Redis BullMQ, or Supabase Edge Functions.
 */

export type JobType =
  | 'EVALUATE_ASSESSMENT_BATCH'
  | 'GENERATE_STUDY_PLAN'
  | 'EXPORT_USER_DATA'
  | 'COMPILE_TOPIC_MASTERY_REPORT';

export type JobStatus = 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

export interface BackgroundJob<TPayload = any, TResult = any> {
  id: string;
  type: JobType;
  userId: string;
  status: JobStatus;
  payload: TPayload;
  result?: TResult;
  error?: string;
  progressPercentage: number;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
}

export class JobQueueManager {
  private jobs: Map<string, BackgroundJob> = new Map();
  private isProcessing = false;
  private concurrency = 2;
  private activeCount = 0;

  createJob<TPayload, TResult>(
    type: JobType,
    userId: string,
    payload: TPayload
  ): BackgroundJob<TPayload, TResult> {
    const job: BackgroundJob<TPayload, TResult> = {
      id: `job_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      type,
      userId,
      status: 'QUEUED',
      payload,
      progressPercentage: 0,
      createdAt: new Date().toISOString()
    };

    this.jobs.set(job.id, job);
    this.processNext();
    return job;
  }

  getJob(jobId: string): BackgroundJob | undefined {
    return this.jobs.get(jobId);
  }

  getUserJobs(userId: string): BackgroundJob[] {
    return Array.from(this.jobs.values()).filter((j) => j.userId === userId);
  }

  private async processNext() {
    if (this.activeCount >= this.concurrency) return;

    const nextJob = Array.from(this.jobs.values()).find((j) => j.status === 'QUEUED');
    if (!nextJob) return;

    this.activeCount++;
    nextJob.status = 'PROCESSING';
    nextJob.startedAt = new Date().toISOString();
    nextJob.progressPercentage = 10;

    // Simulate async execution with staged progress
    setTimeout(() => {
      try {
        nextJob.progressPercentage = 60;
        setTimeout(() => {
          nextJob.status = 'COMPLETED';
          nextJob.progressPercentage = 100;
          nextJob.completedAt = new Date().toISOString();
          nextJob.result = {
            success: true,
            message: `Background job ${nextJob.type} executed successfully.`,
            processedAt: new Date().toISOString()
          };
          this.activeCount--;
          this.processNext();
        }, 1000);
      } catch (err: any) {
        nextJob.status = 'FAILED';
        nextJob.error = err.message || 'Execution failed';
        this.activeCount--;
        this.processNext();
      }
    }, 500);
  }
}

export const jobQueue = new JobQueueManager();
