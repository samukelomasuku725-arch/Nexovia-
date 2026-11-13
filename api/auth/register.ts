/**
 * Vercel Serverless Function: /api/auth/register
 * Registers a user with Email + Password, hashes password with PBKDF2 SHA-512,
 * persists to local DB + Supabase profiles, and returns token + user profile.
 */
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://elvzpyksawrpdzfdnwsj.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_Qvje6uGCD42PcmnFypO89g__TuoqTxR';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function getUsersFile(): string {
  const localFile = path.resolve(process.cwd(), 'data_users.json');
  try {
    if (!fs.existsSync(localFile)) {
      fs.writeFileSync(localFile, JSON.stringify({}, null, 2), 'utf-8');
    }
    fs.accessSync(localFile, fs.constants.W_OK);
    return localFile;
  } catch {
    const tmpFile = '/tmp/nexovian_users.json';
    if (!fs.existsSync(tmpFile)) {
      fs.writeFileSync(tmpFile, JSON.stringify({}, null, 2), 'utf-8');
    }
    return tmpFile;
  }
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

  try {
    const { name, email, password, educationLevel, gradeOrProgramme, preferredLanguage } = req.body || {};
    const emailKey = String(email || '').trim().toLowerCase();

    if (!emailKey || !emailKey.includes('@')) {
      return res.status(400).json({ success: false, message: 'A valid email address is required.' });
    }
    if (!password || String(password).length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
    }

    const usersFile = getUsersFile();
    let users: Record<string, any> = {};
    try {
      users = JSON.parse(fs.readFileSync(usersFile, 'utf-8')) || {};
    } catch {
      users = {};
    }

    if (users[emailKey]) {
      return res.status(400).json({ success: false, message: 'An account with this email address already exists.' });
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = crypto.pbkdf2Sync(String(password), salt, 1000, 64, 'sha512').toString('hex');
    const id = `usr_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const nowIso = new Date().toISOString();

    const newUser = {
      id,
      name: String(name || emailKey.split('@')[0]).trim(),
      email: emailKey,
      role: 'STUDENT',
      passwordHash,
      salt,
      educationLevel: educationLevel || 'School',
      gradeOrProgramme: gradeOrProgramme || 'Grade 10',
      preferredLanguage: preferredLanguage || 'en',
      createdAt: nowIso,
      updatedAt: nowIso,
      authMethod: 'password'
    };

    users[emailKey] = newUser;
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf-8');

    try {
      await supabase.from('profiles').upsert(
        {
          id,
          email: emailKey,
          full_name: newUser.name,
          language_preference: newUser.preferredLanguage,
          subscription_status: 'none',
          created_at: nowIso,
          updated_at: nowIso
        },
        { onConflict: 'email' }
      );
    } catch {
      // Non-blocking
    }

    const token = `bp_tok_${crypto.randomBytes(24).toString('hex')}`;
    return res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          educationLevel: newUser.educationLevel,
          gradeOrProgramme: newUser.gradeOrProgramme,
          preferredLanguage: newUser.preferredLanguage,
          createdAt: newUser.createdAt
        }
      }
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err?.message || 'Registration failed.' });
  }
}
