import * as crypto from 'crypto';

// Function to hash a string using a specific algorithm (e.g., 'sha256')
export const hashString = (input: string, algorithm = 'sha256'): string => {
  const hash = crypto.createHash(algorithm);
  hash.update(input);
  const hashedInput = hash.digest('hex');
  return hashedInput;
};
