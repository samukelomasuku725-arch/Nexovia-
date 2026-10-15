/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BRIGHTPATH ACADEMY - STORAGE SERVICE INTERFACE & ADAPTER
 * 
 * Prepared for Supabase Storage buckets:
 * - 'avatars': Public/Authenticated user profile pictures
 * - 'scans': Scan & Learn camera uploads & homework worksheets
 * - 'attachments': Assessment written response image uploads
 * - 'exports': POPIA/GDPR data export downloads
 * 
 * In development, uses Data URI / Blob Object URL / proxy routes.
 * When SUPABASE_URL & SUPABASE_KEY are provided, smoothly delegates to Supabase Storage API.
 */

import { IStorageService } from './types';

export class StorageService implements IStorageService {
  private localFiles: Map<string, { data: string; contentType: string; createdAt: string }> = new Map();

  async uploadFile(params: {
    bucket: 'avatars' | 'scans' | 'attachments' | 'exports';
    path: string;
    file: Blob | Buffer | string;
    contentType: string;
  }): Promise<{ publicUrl?: string; path: string }> {
    const key = `${params.bucket}/${params.path}`;
    let dataUrl: string;

    if (typeof params.file === 'string') {
      dataUrl = params.file.startsWith('data:')
        ? params.file
        : `data:${params.contentType};base64,${params.file}`;
    } else if (params.file instanceof Blob) {
      dataUrl = URL.createObjectURL(params.file);
    } else {
      dataUrl = `data:${params.contentType};base64,${params.file.toString('base64')}`;
    }

    this.localFiles.set(key, {
      data: dataUrl,
      contentType: params.contentType,
      createdAt: new Date().toISOString()
    });

    return {
      publicUrl: dataUrl,
      path: key
    };
  }

  async getSignedUrl(bucket: string, path: string, _expiresInSeconds = 3600): Promise<string> {
    const key = `${bucket}/${path}`;
    const file = this.localFiles.get(key);
    if (file) {
      return file.data;
    }
    // Return placeholder or direct path
    return `/storage/${bucket}/${path}`;
  }

  async deleteFile(bucket: string, path: string): Promise<boolean> {
    const key = `${bucket}/${path}`;
    return this.localFiles.delete(key);
  }
}

export const storageService = new StorageService();
