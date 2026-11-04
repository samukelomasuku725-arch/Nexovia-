/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN ADMIN PAYMENTS VIEW (/admin/payments)
 * 
 * - Password protected via ADMIN_PASSWORD (defaults to nexovian2026admin)
 * - Table: Name, Phone, Reference, Access Code, Start Date, End Date, Days Left, Status (Active/Expired)
 * - Actions: "Extend 30 Days", "Expire Now"
 */

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Search,
  RefreshCw,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  MinusCircle,
  ArrowLeft,
  Key,
  Users,
  CreditCard,
  DollarSign
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

interface PaymentItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  reference: string;
  access_code: string;
  payment_status: string;
  subscription_status: 'active' | 'expired';
  subscription_start: number;
  subscription_end: number;
  start_date_formatted: string;
  end_date_formatted: string;
  days_left: number;
  last_payment_date: number;
}

export const AdminPaymentsView: React.FC = () => {
  const { setCurrentTab } = useLearning();

  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('nexovian_admin_auth') === 'true';
    }
    return false;
  });
  const [authError, setAuthError] = useState<string | null>(null);

  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const storedAdminPassword = typeof window !== 'undefined' ? sessionStorage.getItem('nexovian_admin_pass') || '' : '';

  const fetchPayments = async (pass: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/payments', {
        headers: {
          'x-admin-password': pass
        }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPayments(data.payments || []);
        setIsAuthenticated(true);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('nexovian_admin_auth', 'true');
          sessionStorage.setItem('nexovian_admin_pass', pass);
        }
        setAuthError(null);
      } else {
        setAuthError(data.message || 'Incorrect admin password.');
        setIsAuthenticated(false);
      }
    } catch (err: any) {
      setAuthError('Error communicating with server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && storedAdminPassword) {
      fetchPayments(storedAdminPassword);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPayments(password);
  };

  const handleExtend = async (id: string) => {
    const pass = storedAdminPassword || password;
    try {
      const res = await fetch(`/api/admin/payments/${id}/extend`, {
        method: 'POST',
        headers: { 'x-admin-password': pass }
      });
      const data = await res.json();
      if (data.success) {
        setActionNotice('Subscription extended by 30 days.');
        fetchPayments(pass);
        setTimeout(() => setActionNotice(null), 3000);
      }
    } catch (_) {}
  };

  const handleExpire = async (id: string) => {
    const pass = storedAdminPassword || password;
    try {
      const res = await fetch(`/api/admin/payments/${id}/expire`, {
        method: 'POST',
        headers: { 'x-admin-password': pass }
      });
      const data = await res.json();
      if (data.success) {
        setActionNotice('Subscription marked as expired.');
        fetchPayments(pass);
        setTimeout(() => setActionNotice(null), 3000);
      }
    } catch (_) {}
  };

  const filtered = payments.filter((p) => {
    const query = searchQuery.toLowerCase();
    return (
      p.name?.toLowerCase().includes(query) ||
      p.phone?.toLowerCase().includes(query) ||
      p.reference?.toLowerCase().includes(query) ||
      p.access_code?.toLowerCase().includes(query) ||
      p.email?.toLowerCase().includes(query)
    );
  });

  const activeCount = payments.filter((p) => p.subscription_status === 'active').length;
  const expiredCount = payments.filter((p) => p.subscription_status === 'expired').length;
  const revenueEst = payments.length * 60;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A1F44] flex items-center justify-center p-4">
        <div className="bg-[#000000] border-2 border-[#FFB612] rounded-3xl max-w-md w-full p-8 text-center shadow-2xl relative">
          <div className="w-14 h-14 rounded-full bg-[#FFB612] text-black flex items-center justify-center mx-auto mb-4 font-black shadow-lg">
            <Lock className="w-6 h-6 text-black" />
          </div>

          <h2 className="font-display font-black text-2xl text-white mb-1">
            Admin Payments Panel
          </h2>
          <p className="text-xs text-white/60 mb-6">
            Enter the admin master password to inspect SnapScan payments and manage learner access.
          </p>

          {authError && (
            <div className="p-3 mb-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                placeholder="Enter ADMIN_PASSWORD..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#FFB612]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-[#007A4D] hover:bg-emerald-600 disabled:opacity-50 text-white font-black text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01]"
            >
              <Key className="w-4 h-4" />
              <span>{isLoading ? 'Authenticating...' : 'Unlock Admin Dashboard'}</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentTab('home')}
              className="w-full py-2.5 text-xs text-white/50 hover:text-white transition-colors"
            >
              Return to App
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans antialiased selection:bg-[#FFB612] selection:text-black pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0A1F44] border-b border-white/10 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentTab('home')}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return</span>
            </button>
            <div className="h-6 w-px bg-white/20" />
            <div>
              <h1 className="font-display font-black text-lg text-white leading-tight flex items-center gap-2">
                <span>NEXOVIAN &bull; Payments &amp; Auto-Lock Admin</span>
                <span className="px-2 py-0.5 rounded-full bg-[#007A4D] text-white text-[10px] font-mono">
                  LIVE
                </span>
              </h1>
              <span className="text-[11px] text-[#FFB612] font-mono">
                Reg: 2026/234078/07 &bull; Automated 30-Day Subscriptions
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchPayments(storedAdminPassword || password)}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem('nexovian_admin_auth');
                sessionStorage.removeItem('nexovian_admin_pass');
                setIsAuthenticated(false);
              }}
              className="p-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-bold"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-6">
        
        {actionNotice && (
          <div className="p-4 rounded-2xl bg-[#007A4D]/30 border border-[#007A4D] text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-[#0A1F44] border border-white/10">
            <span className="text-[11px] font-mono uppercase text-white/60 block mb-1">
              Total Payments
            </span>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {payments.length}
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-[#0A1F44] border border-[#007A4D]">
            <span className="text-[11px] font-mono uppercase text-emerald-300 block mb-1">
              Active Subscriptions
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              {activeCount}
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-[#0A1F44] border border-red-500/40">
            <span className="text-[11px] font-mono uppercase text-red-300 block mb-1">
              Expired (30d Passed)
            </span>
            <div className="text-2xl sm:text-3xl font-black text-red-400">
              {expiredCount}
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-[#0A1F44] border border-[#FFB612]">
            <span className="text-[11px] font-mono uppercase text-[#FFB612] block mb-1">
              Total Revenue (R60 ea)
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#FFB612]">
              R{revenueEst.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center justify-between gap-4 bg-[#0D0D0D] p-4 rounded-2xl border border-white/10">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by name, phone, reference, or access code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#FFB612]"
            />
          </div>
          <span className="text-xs text-white/50 font-mono shrink-0">
            Showing {filtered.length} of {payments.length}
          </span>
        </div>

        {/* Payments Table */}
        <div className="bg-[#0c0c0c] border border-white/15 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0A1F44] text-white/80 font-mono uppercase text-[11px] border-b border-white/10">
                <tr>
                  <th className="py-3.5 px-4">Learner Name</th>
                  <th className="py-3.5 px-4">Phone</th>
                  <th className="py-3.5 px-4">SnapScan Reference</th>
                  <th className="py-3.5 px-4">Access Code</th>
                  <th className="py-3.5 px-4">Start Date</th>
                  <th className="py-3.5 px-4">End Date</th>
                  <th className="py-3.5 px-4">Days Left</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Quick Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-white/50 text-xs font-mono">
                      No payments recorded yet. As learners verify their SnapScan receipts, they will appear here automatically.
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => {
                    const isActive = item.subscription_status === 'active';
                    return (
                      <tr key={item.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4 font-bold text-white">
                          <div>{item.name}</div>
                          {item.email && <div className="text-[10px] text-white/50 font-mono">{item.email}</div>}
                        </td>
                        <td className="py-4 px-4 font-mono text-white/90">
                          {item.phone}
                        </td>
                        <td className="py-4 px-4 font-mono text-[#FFB612]">
                          {item.reference}
                        </td>
                        <td className="py-4 px-4 font-mono font-bold text-emerald-400">
                          {item.access_code}
                        </td>
                        <td className="py-4 px-4 font-mono text-white/70">
                          {item.start_date_formatted}
                        </td>
                        <td className="py-4 px-4 font-mono text-white/70">
                          {item.end_date_formatted}
                        </td>
                        <td className="py-4 px-4 font-mono font-bold">
                          <span className={isActive ? (item.days_left <= 7 ? 'text-amber-400' : 'text-emerald-400') : 'text-red-400'}>
                            {item.days_left} days
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                              isActive
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : 'bg-red-500/20 text-red-300 border border-red-500/40'
                            }`}
                          >
                            {item.subscription_status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleExtend(item.id)}
                              className="px-2.5 py-1 rounded-lg bg-[#007A4D]/30 hover:bg-[#007A4D] text-emerald-300 hover:text-white border border-[#007A4D]/50 text-[11px] font-bold transition-colors cursor-pointer"
                              title="Extend 30 Days"
                            >
                              +30 Days
                            </button>
                            <button
                              onClick={() => handleExpire(item.id)}
                              className="px-2.5 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300 hover:text-white border border-red-500/40 text-[11px] font-bold transition-colors cursor-pointer"
                              title="Expire Immediately"
                            >
                              Expire Now
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
      </main>
    </div>
  );
};
