/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIA - AI CONVERSATION & SAVED CONTENT REPOSITORY
 * 
 * Centralized, decoupled repository for AI Tutor conversations and saved notes/content.
 */

import { IAIConversationRepository } from './types';
import { AIConversation, PaginatedResult, PaginationParams, SavedLearningItem } from '../types';

export class AIConversationRepository implements IAIConversationRepository {
  private localConversations: AIConversation[] = [];
  private localSavedItems: SavedLearningItem[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const storedConv = localStorage.getItem('nexovia_conversations');
        if (storedConv) this.localConversations = JSON.parse(storedConv);

        const storedSaved = localStorage.getItem('nexovia_saved_content');
        if (storedSaved) this.localSavedItems = JSON.parse(storedSaved);
      }
    } catch {
      // Storage unavailable
    }
  }

  private persistStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('nexovia_conversations', JSON.stringify(this.localConversations.slice(-50)));
        localStorage.setItem('nexovia_saved_content', JSON.stringify(this.localSavedItems.slice(-100)));
      }
    } catch {
      // Ignore
    }
  }

  async getConversations(
    userId: string,
    pagination?: PaginationParams
  ): Promise<PaginatedResult<AIConversation>> {
    try {
      const res = await fetch('/api/ai/conversations');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          this.localConversations = json.data;
          this.persistStorage();
        }
      }
    } catch {
      // Local fallback
    }

    const filtered = this.localConversations.filter((c) => !c.userId || c.userId === userId);
    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 20;
    const start = (page - 1) * pageSize;
    const paginated = filtered.slice(start, start + pageSize);

    return {
      data: paginated,
      total: filtered.length,
      page,
      pageSize,
      hasMore: start + pageSize < filtered.length
    };
  }

  async getConversationById(conversationId: string): Promise<AIConversation | null> {
    try {
      const res = await fetch(`/api/ai/conversations/${encodeURIComponent(conversationId)}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return json.data;
        }
      }
    } catch {
      // Fallback
    }

    return this.localConversations.find((c) => c.id === conversationId) || null;
  }

  async saveConversation(conversation: AIConversation): Promise<AIConversation> {
    const idx = this.localConversations.findIndex((c) => c.id === conversation.id);
    if (idx >= 0) {
      this.localConversations[idx] = conversation;
    } else {
      this.localConversations.unshift(conversation);
    }
    this.persistStorage();

    try {
      if (idx >= 0) {
        await fetch(`/api/ai/conversations/${encodeURIComponent(conversation.id)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(conversation)
        });
      } else {
        await fetch('/api/ai/conversations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(conversation)
        });
      }
    } catch {
      // Saved locally
    }

    return conversation;
  }

  async deleteConversation(conversationId: string): Promise<boolean> {
    this.localConversations = this.localConversations.filter((c) => c.id !== conversationId);
    this.persistStorage();

    try {
      await fetch(`/api/ai/conversations/${encodeURIComponent(conversationId)}`, {
        method: 'DELETE'
      });
      return true;
    } catch {
      return true;
    }
  }

  async getSavedContent(
    userId: string,
    pagination?: PaginationParams
  ): Promise<PaginatedResult<SavedLearningItem>> {
    try {
      const res = await fetch('/api/ai/saved');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          this.localSavedItems = json.data;
          this.persistStorage();
        }
      }
    } catch {
      // Local fallback
    }

    const filtered = this.localSavedItems.filter((i) => !i.userId || i.userId === userId);
    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 20;
    const start = (page - 1) * pageSize;
    const paginated = filtered.slice(start, start + pageSize);

    return {
      data: paginated,
      total: filtered.length,
      page,
      pageSize,
      hasMore: start + pageSize < filtered.length
    };
  }

  async addSavedItem(item: SavedLearningItem): Promise<SavedLearningItem> {
    this.localSavedItems.unshift(item);
    this.persistStorage();

    try {
      await fetch('/api/ai/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
    } catch {
      // Offline fallback
    }

    return item;
  }

  async deleteSavedItem(itemId: string): Promise<boolean> {
    this.localSavedItems = this.localSavedItems.filter((i) => i.id !== itemId);
    this.persistStorage();

    try {
      await fetch(`/api/ai/saved/${encodeURIComponent(itemId)}`, {
        method: 'DELETE'
      });
      return true;
    } catch {
      return true;
    }
  }
}

export const aiConversationRepository = new AIConversationRepository();
