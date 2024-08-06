import * as crypto from 'crypto';

const MIN_SECRET_LENGTH = 8;

export function encryptString(secret: string, content: string): string {
  if (secret.length < MIN_SECRET_LENGTH) {
    throw new Error(`Secret must be at least ${MIN_SECRET_LENGTH} characters long`);
  }

  const iv = crypto.randomBytes(16);
  const key = crypto.createHash('sha256').update(secret).digest();
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(content, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

export function decryptString(secret: string, ciphertext: string): string {
  if (secret.length < MIN_SECRET_LENGTH) {
    throw new Error(`Secret must be at least ${MIN_SECRET_LENGTH} characters long`);
  }

  const [ivHex, encrypted] = ciphertext.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const key = crypto.createHash('sha256').update(secret).digest();
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
