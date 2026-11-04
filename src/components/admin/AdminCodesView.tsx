/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN ADMIN UNLOCK CODES (/admin/codes)
 * 
 * Requirements:
 * - Password via ADMIN_PASSWORD (default: nexovian2026admin)
 * - ONLY for viewing, NOT for generating
 * - List: Code, Phone, Reference, Status, Created, Used Date, Expiry, Days Left
 * - Buttons: [Expire Code] [Delete Code]
 * - NO [Generate Code] button - system generates automatically
 */

import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Search,
  RefreshCw,
  Trash2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  KeyRound,
  ExternalLink,
  Ban
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

interface AdminCodeItem {
  id: string;
  code: string;
  phone: string;
  email: string;
  reference: string;
  status: 'unused' | 'used' | 'expired';
  created_formatted: string;
  used_formatted: string;
  expiry_formatted: string;
  days_left: number;
}

export const AdminCodesView: React.FC = () => {
  const { setCurrentTab } = useLearning();

  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [codes, setCodes] = useState<AdminCodeItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [filterQuery, setFilterQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    unused: 0,
    active: 0,
    expired: 0
  });

  const fetchCodes = async (pwdToUse: string) => {
    setIsLoading(true);
    setActionMessage(null);
    try {
      const res = await fetch(`/api/admin/codes?password=${encodeURIComponent(pwdToUse)}`, {
        headers: {
          'x-admin-password': pwdToUse
        }
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setIsAuthenticated(false);
        setAuthError(data.message || 'Invalid administrator password.');
        return;
      }

      setIsAuthenticated(true);
      setCodes(data.codes || []);
      setStats({
        total: data.total || 0,
        unused: data.unusedCount || 0,
        active: data.activeCount || 0,
        expired: data.expiredCount || 0
      });
      setAuthError(null);
    } catch (err: any) {
      setAuthError(err?.message || 'Network error fetching codes.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    fetchCodes(password);
  };

  const handleExpire = async (code: string) => {
    if (!window.confirm(`Expire code ${code} immediately?`)) return;
    try {
      const res = await fetch('/api/admin/codes/expire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password
        },
        body: JSON.stringify({ code })
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage(`Code ${code} expired.`);
        fetchCodes(password);
      } else {
        alert(data.message || 'Failed to expire code');
      }
    } catch (err: any) {
      alert('Error expiring code: ' + err.message);
    }
  };

  const handleDelete = async (code: string) => {
    if (!window.confirm(`Permanently delete code ${code}? This cannot be undone.`)) return;
    try {
      const res = await fetch('/api/admin/codes/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password
        },
        body: JSON.stringify({ code })
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage(`Code ${code} deleted.`);
        fetchCodes(password);
      } else {
        alert(data.message || 'Failed to delete code');
      }
    } catch (err: any) {
      alert('Error deleting code: ' + err.message);
    }
  };

  const handleCopy = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedCode(val);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filtered = codes.filter((c) => {
    const q = filterQuery.toLowerCase();
    return (
      c.code.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      c.reference.toLowerCase().includes(q) ||
      c.status.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    );
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A1F44] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#000000] border-2 border-[#FFB612] rounded-3xl p-8 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-[#FFB612]/20 border-2 border-[#FFB612] text-[#FFB612] flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-8 h-8 text-[#FFB612]" />
          </div>

          <h2 className="font-display font-black text-2xl text-center text-white">
            NEXOVIAN Admin
          </h2>
          <p className="text-xs text-white/60 text-center mt-1 mb-6">
            Enter administrator password to inspect unlock codes
          </p>

          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-white/70 mb-1 font-bold">
                Admin Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs focus:outline-none focus:border-[#FFB612]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-[#FFB612] hover:bg-yellow-400 text-black font-black text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isLoading ? 'Verifying...' : 'Access Code Registry'}</span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setCurrentTab('landing')}
              className="text-xs text-white/50 hover:text-white"
            >
              &larr; Back to Landing Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1F44] text-white p-4 sm:p-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-[#FFB612]" />
              <h1 className="font-display font-black text-2xl text-white">
                Unlock Codes Registry
              </h1>
            </div>
            <p className="text-xs text-white/60 mt-1">
              Automated in-app one-time unlock codes. No WhatsApp codes. System generates automatically.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchCodes(password)}
              disabled={isLoading}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={() => setCurrentTab('landing')}
              className="px-4 py-2 rounded-xl bg-[#007A4D] hover:bg-emerald-600 text-white text-xs font-bold cursor-pointer"
            >
              Open Site
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-black/60 border border-white/10">
            <span className="text-[11px] font-mono uppercase text-white/60">Total Codes</span>
            <div className="text-2xl font-black text-white mt-1">{stats.total}</div>
          </div>
          <div className="p-4 rounded-2xl bg-black/60 border border-white/10">
            <span className="text-[11px] font-mono uppercase text-[#FFB612]">Unused Codes</span>
            <div className="text-2xl font-black text-[#FFB612] mt-1">{stats.unused}</div>
          </div>
          <div className="p-4 rounded-2xl bg-black/60 border border-white/10">
            <span className="text-[11px] font-mono uppercase text-emerald-400">Active (Used &lt; 30d)</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">{stats.active}</div>
          </div>
          <div className="p-4 rounded-2xl bg-black/60 border border-white/10">
            <span className="text-[11px] font-mono uppercase text-rose-400">Expired</span>
            <div className="text-2xl font-black text-rose-400 mt-1">{stats.expired}</div>
          </div>
        </div>

        {/* Action feedback banner */}
        {actionMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center justify-between">
            <span>{actionMessage}</span>
            <button onClick={() => setActionMessage(null)} className="text-white/60 hover:text-white">✕</button>
          </div>
        )}

        {/* Search Bar */}
        <div className="flex items-center gap-3 bg-black/60 border border-white/10 px-4 py-2.5 rounded-2xl">
          <Search className="w-4 h-4 text-white/40 shrink-0" />
          <input
            type="text"
            placeholder="Search by code (e.g. NEX-482910), phone number, or reference..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full bg-transparent text-white text-xs focus:outline-none placeholder:text-white/40"
          />
        </div>

        {/* Table of Codes */}
        <div className="bg-black/70 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 border-b border-white/10 text-white/60 uppercase font-mono text-[10px]">
                <tr>
                  <th className="py-3 px-4">Unlock Code</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Phone Number</th>
                  <th className="py-3 px-4">Reference</th>
                  <th className="py-3 px-4">Created Date</th>
                  <th className="py-3 px-4">Used Date</th>
                  <th className="py-3 px-4">Expiry Date</th>
                  <th className="py-3 px-4">Days Left</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-white/40 font-mono">
                      No unlock codes found matching query.
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => {
                    const isUnused = item.status === 'unused';
                    const isUsed = item.status === 'used';
                    const isExpired = item.status === 'expired';

                    return (
                      <tr key={item.id} className="hover:bg-white/[0.03] transition-colors">
                        {/* Code */}
                        <td className="py-3.5 px-4 font-mono font-bold text-white">
                          <div className="flex items-center gap-2">
                            <span className="text-[#FFB612] bg-[#FFB612]/10 px-2 py-0.5 rounded border border-[#FFB612]/30">
                              {item.code}
                            </span>
                            <button
                              onClick={() => handleCopy(item.code)}
                              className="text-white/40 hover:text-white p-1"
                              title="Copy code"
                            >
                              {copiedCode === item.code ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">
                          {isUnused && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-500/20 text-yellow-300 font-mono text-[10px] font-bold border border-yellow-500/40">
                              UNUSED
                            </span>
                          )}
                          {isUsed && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/40">
                              USED
                            </span>
                          )}
                          {isExpired && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 font-mono text-[10px] font-bold border border-rose-500/40">
                              EXPIRED
                            </span>
                          )}
                        </td>

                        {/* Phone */}
                        <td className="py-3.5 px-4 font-mono text-white/90">
                          {item.phone}
                        </td>

                        {/* Reference */}
                        <td className="py-3.5 px-4 font-mono text-white/70 max-w-[140px] truncate" title={item.reference}>
                          {item.reference}
                        </td>

                        {/* Created */}
                        <td className="py-3.5 px-4 text-white/60">
                          {item.created_formatted}
                        </td>

                        {/* Used Date */}
                        <td className="py-3.5 px-4 text-white/60">
                          {item.used_formatted}
                        </td>

                        {/* Expiry */}
                        <td className="py-3.5 px-4 text-white/60 font-mono">
                          {item.expiry_formatted}
                        </td>

                        {/* Days Left */}
                        <td className="py-3.5 px-4 font-bold font-mono">
                          {item.days_left > 0 ? (
                            <span className="text-emerald-400">{item.days_left}d</span>
                          ) : (
                            <span className="text-white/30">0</span>
                          )}
                        </td>

                        {/* Actions: ONLY [Expire Code] and [Delete Code]. NO [Generate Code] button. */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {item.status !== 'expired' && (
                              <button
                                onClick={() => handleExpire(item.code)}
                                className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] font-bold border border-amber-500/40 flex items-center gap-1 cursor-pointer"
                                title="Expire Code"
                              >
                                <Ban className="w-3 h-3" />
                                <span>Expire</span>
                              </button>
                            )}

                            <button
                              onClick={() => handleDelete(item.code)}
                              className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-[11px] font-bold border border-rose-500/40 flex items-center gap-1 cursor-pointer"
                              title="Delete Code"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center text-xs text-white/40 pt-4">
          NEXOVIAN Code Registry &bull; Total auto-generated codes: {codes.length}
        </div>
      </div>
    </div>
  );
};
