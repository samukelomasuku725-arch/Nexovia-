/**
 * Vercel Serverless Function: /api/auth/login
 * Authenticates a user with Email + Password and returns token + user profile.
 */
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

function getUsersFile(): string {
  const localFile = path.resolve(process.cwd(), 'data_users.json');
  try {
    if (fs.existsSync(localFile)) return localFile;
  } catch {
    // ignore
  }
  return '/tmp/nexovian_users.json';
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

  try {
    const { email, password } = req.body || {};
    const emailKey = String(email || '').trim().toLowerCase();

    if (!emailKey || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const usersFile = getUsersFile();
    let users: Record<string, any> = {};
    try {
      if (fs.existsSync(usersFile)) {
        users = JSON.parse(fs.readFileSync(usersFile, 'utf-8')) || {};
      }
    } catch {
      users = {};
    }

    const user = users[emailKey];
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const computedHash = crypto.pbkdf2Sync(String(password), user.salt, 1000, 64, 'sha512').toString('hex');
    if (computedHash !== user.passwordHash) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = `bp_tok_${crypto.randomBytes(24).toString('hex')}`;
    return res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role || 'STUDENT',
          educationLevel: user.educationLevel,
          gradeOrProgramme: user.gradeOrProgramme,
          preferredLanguage: user.preferredLanguage,
          createdAt: user.createdAt
        }
      }
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err?.message || 'Login failed.' });
  }
}
