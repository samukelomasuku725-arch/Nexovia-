import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role?: string;
  passwordHash: string;
  salt: string;
  educationLevel: string;
  gradeOrProgramme: string;
  preferredLanguage: string;
  popiaConsent?: boolean;
  popiaConsentDate?: string;
  isMinor?: boolean;
  guardianEmail?: string;
  guardianConsent?: boolean;
  createdAt: string;
  updatedAt: string;
  authMethod: 'password' | 'passkey_ready';
}

export interface UserProfileResponse {
  id: string;
  name: string;
  email: string;
  role?: string;
  educationLevel: string;
  gradeOrProgramme: string;
  preferredLanguage: string;
  popiaConsent?: boolean;
  popiaConsentDate?: string;
  isMinor?: boolean;
  guardianEmail?: string;
  guardianConsent?: boolean;
  createdAt: string;
}

const USERS_FILE = path.resolve(__dirname, '..', 'data_users.json');

function loadUsers(): Record<string, UserAccount> {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed to load users database:', err);
  }
  return {};
}

function saveUsers(users: Record<string, UserAccount>): void {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save users database:', err);
  }
}

function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

// In-memory active tokens mapping: token -> userId
const activeSessions: Map<string, { userId: string; expiresAt: number }> = new Map();

export function registerUser(params: {
  name: string;
  email: string;
  password?: string;
  educationLevel?: string;
  gradeOrProgramme?: string;
  preferredLanguage?: string;
}): { token: string; user: UserProfileResponse } {
  const users = loadUsers();
  const emailKey = params.email.toLowerCase().trim();

  if (users[emailKey]) {
    throw new Error('An account with this email address already exists.');
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const password = params.password || 'TemporaryDemoPass123!';
  const passwordHash = hashPassword(password, salt);
  const id = `usr_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

  const newUser: UserAccount = {
    id,
    name: params.name.trim(),
    email: emailKey,
    passwordHash,
    salt,
    educationLevel: params.educationLevel || 'School',
    gradeOrProgramme: params.gradeOrProgramme || 'Grade 10',
    preferredLanguage: params.preferredLanguage || 'en',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    authMethod: 'password'
  };

  users[emailKey] = newUser;
  saveUsers(users);

  const token = `bp_tok_${crypto.randomBytes(24).toString('hex')}`;
  activeSessions.set(token, {
    userId: newUser.id,
    expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
  });

  return {
    token,
    user: toUserProfile(newUser)
  };
}

export function loginUser(params: {
  email: string;
  password?: string;
}): { token: string; user: UserProfileResponse } {
  const users = loadUsers();
  const emailKey = params.email.toLowerCase().trim();
  const user = users[emailKey];

  if (!user) {
    throw new Error('Invalid email or password.');
  }

  if (params.password) {
    const computedHash = hashPassword(params.password, user.salt);
    if (computedHash !== user.passwordHash) {
      throw new Error('Invalid email or password.');
    }
  }

  const token = `bp_tok_${crypto.randomBytes(24).toString('hex')}`;
  activeSessions.set(token, {
    userId: user.id,
    expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000
  });

  return {
    token,
    user: toUserProfile(user)
  };
}

export function getUserByToken(token: string): UserProfileResponse | null {
  const session = activeSessions.get(token);
  if (!session || session.expiresAt < Date.now()) {
    return null;
  }

  const users = loadUsers();
  for (const email of Object.keys(users)) {
    if (users[email].id === session.userId) {
      return toUserProfile(users[email]);
    }
  }
  return null;
}

export function updateUserProfile(
  userId: string,
  updates: Partial<{
    name: string;
    educationLevel: string;
    gradeOrProgramme: string;
    preferredLanguage: string;
    role: string;
    popiaConsent: boolean;
    popiaConsentDate: string;
    guardianEmail: string;
    guardianConsent: boolean;
  }>
): UserProfileResponse {
  const users = loadUsers();
  let targetUser: UserAccount | null = null;
  let targetEmail = '';

  for (const email of Object.keys(users)) {
    if (users[email].id === userId) {
      targetUser = users[email];
      targetEmail = email;
      break;
    }
  }

  if (!targetUser) {
    throw new Error('User not found.');
  }

  if (updates.name) targetUser.name = updates.name.trim();
  if (updates.educationLevel) targetUser.educationLevel = updates.educationLevel;
  if (updates.gradeOrProgramme) targetUser.gradeOrProgramme = updates.gradeOrProgramme;
  if (updates.preferredLanguage) targetUser.preferredLanguage = updates.preferredLanguage;
  if (updates.role) targetUser.role = updates.role;
  if (updates.popiaConsent !== undefined) targetUser.popiaConsent = updates.popiaConsent;
  if (updates.popiaConsentDate) targetUser.popiaConsentDate = updates.popiaConsentDate;
  if (updates.guardianEmail !== undefined) targetUser.guardianEmail = updates.guardianEmail;
  if (updates.guardianConsent !== undefined) targetUser.guardianConsent = updates.guardianConsent;
  targetUser.updatedAt = new Date().toISOString();

  users[targetEmail] = targetUser;
  saveUsers(users);

  return toUserProfile(targetUser);
}

function toUserProfile(u: UserAccount): UserProfileResponse {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role || 'STUDENT',
    educationLevel: u.educationLevel,
    gradeOrProgramme: u.gradeOrProgramme,
    preferredLanguage: u.preferredLanguage,
    popiaConsent: u.popiaConsent ?? true,
    popiaConsentDate: u.popiaConsentDate,
    isMinor: u.isMinor ?? false,
    guardianEmail: u.guardianEmail,
    guardianConsent: u.guardianConsent,
    createdAt: u.createdAt
  };
}
