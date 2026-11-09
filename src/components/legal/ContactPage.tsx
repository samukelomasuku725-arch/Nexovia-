import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export const ContactPage: React.FC = () => {
  const { setCurrentTab } = useLearning();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#222222] font-sans text-center relative pb-16">
      {/* Return Navigation */}
      <div className="bg-black/90 px-4 py-2.5 flex items-center justify-between text-xs text-white border-b border-gray-800">
        <button
          onClick={() => setCurrentTab('home')}
          className="inline-flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>
        <div className="flex items-center gap-2 text-amber-400 font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CAPS Official Curriculum</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-black text-white px-5 py-14 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display mb-3">
          NEXOVIAN
        </h1>
        <p className="text-lg sm:text-xl font-medium text-gray-200 mb-1">
          Grade 4 to University
        </p>
        <p className="text-lg sm:text-xl font-medium text-amber-400">
          11 South African Languages
        </p>
      </div>

      {/* Card Section */}
      <div className="bg-white max-w-[560px] mx-auto -mt-[30px] mb-8 p-6 sm:p-8 rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-center border border-gray-100/80">
        <h2 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
          Contact Nexovian
        </h2>

        {/* Contact Info Text */}
        <div className="text-gray-700 text-sm leading-relaxed mb-6 space-y-1.5 text-center">
          <p>
            <strong>Email:</strong>{' '}
            <a
              href="mailto:samukelomasuku725@gmail.com"
              className="text-[#0077b6] hover:underline font-medium"
            >
              samukelomasuku725@gmail.com
            </a>
          </p>
          <p>
            <strong>Website:</strong>{' '}
            <a
              href="https://nexovian.group"
              target="_blank"
              rel="noreferrer"
              className="text-gray-900 hover:underline font-medium"
            >
              nexovian.group
            </a>
          </p>
          <p>
            <strong>Business Address:</strong> Mbombela, Mpumalanga, South Africa
          </p>
          <p>
            <strong>Hours:</strong> Monday - Saturday, 8am - 6pm.
          </p>
          <p className="text-amber-700 font-semibold text-xs pt-1">
            We reply within 24 hours.
          </p>
        </div>

        {/* Contact Form */}
        {submitted ? (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-base text-emerald-950">Message Sent!</h3>
            <p className="text-xs text-emerald-800">
              Thank you for reaching out. We reply within 24 hours to <strong>{email}</strong>.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setMessage('');
              }}
              className="mt-2 text-xs font-semibold text-[#0077b6] hover:underline"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-left pt-2 border-t border-gray-100">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0077b6] focus:ring-1 focus:ring-[#0077b6]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0077b6] focus:ring-1 focus:ring-[#0077b6]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Message
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you?"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0077b6] focus:ring-1 focus:ring-[#0077b6] resize-y"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#0077b6] hover:bg-[#023e8a] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>

      {/* Trust & Features Footer */}
      <div className="max-w-md mx-auto px-4 text-xs text-gray-500 space-y-2">
        <p>No card deductions without confirmation • Cancel anytime</p>
        <p>Supports all 11 official South African languages, CAPS curriculum, TVET NATED, and University modules.</p>
        <p className="font-semibold text-gray-600">NEXOVIAN (PTY) LTD • Reg: 2026/845572/07 • Level 1 B-BBEE</p>
      </div>
    </div>
  );
};

export default ContactPage;
