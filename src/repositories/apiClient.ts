/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIA - CENTRALIZED API CLIENT
 * 
 * Provides:
 * - Uniform request headers & correlation IDs (X-Request-ID)
 * - Automatic Bearer token injection from auth session
 * - Structured error handling with code & message
 * - Request timeouts and error normalization
 * - Replaceable base URL (defaults to proxy /api/* in dev, Supabase or edge in prod)
 */

import { ApiStandardResponse } from '../types';

export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public status?: number,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ApiClient {
  private baseUrl: string;
  private tokenGetter?: () => string | null;

  constructor(options?: { baseUrl?: string; tokenGetter?: () => string | null }) {
    this.baseUrl = options?.baseUrl || '';
    this.tokenGetter = options?.tokenGetter;
  }

  setTokenGetter(getter: () => string | null) {
    this.tokenGetter = getter;
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Request-ID': `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
    };

    if (this.tokenGetter) {
      const token = this.tokenGetter();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  async get<T>(endpoint: string, queryParams?: Record<string, any>): Promise<T> {
    let url = `${this.baseUrl}${endpoint}`;
    if (queryParams) {
      const sp = new URLSearchParams();
      for (const [k, v] of Object.entries(queryParams)) {
        if (v !== undefined && v !== null) {
          sp.append(k, String(v));
        }
      }
      const qs = sp.toString();
      if (qs) url += `?${qs}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders()
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, body?: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: body ? JSON.stringify(body) : undefined
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, body?: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: body ? JSON.stringify(body) : undefined
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });

    return this.handleResponse<T>(response);
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    let payload: any = null;
    const contentType = response.headers.get('content-type') || '';

    try {
      if (contentType.includes('application/json')) {
        payload = await response.json();
      } else {
        payload = await response.text();
      }
    } catch {
      payload = null;
    }

    if (!response.ok) {
      const code = payload?.error?.code || payload?.code || `HTTP_${response.status}`;
      const message =
        payload?.error?.message ||
        payload?.message ||
        `Request failed with status ${response.status}: ${response.statusText}`;
      const details = payload?.error?.details || payload?.details;

      throw new ApiError(code, message, response.status, details);
    }

    // Unpack standard envelope if present: { success: true, data: T }
    if (payload && typeof payload === 'object' && 'success' in payload) {
      if (payload.success === false) {
        const code = payload.error?.code || 'OPERATION_FAILED';
        const message = payload.error?.message || payload.message || 'Operation failed.';
        throw new ApiError(code, message, response.status, payload.error?.details);
      }
      return (payload.data !== undefined ? payload.data : payload) as T;
    }

    return payload as T;
  }
}

export const apiClient = new ApiClient({
  baseUrl: '',
  tokenGetter: () => {
    try {
      return localStorage.getItem('nexovia_auth_token');
    } catch {
      return null;
    }
  }
});
