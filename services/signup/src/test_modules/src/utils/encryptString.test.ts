import { decryptString, encryptString } from './encryptString';

describe('Encryption/Decryption', () => {
  const secret = 'mySecretKey';
  const shortSecret = 'short';
  const content = 'Hello, World!';

  test('encryptString should return a non-empty string', () => {
    const encrypted = encryptString(secret, content);
    expect(encrypted).not.toBe('');
  });

  test('decryptString should return the original content', () => {
    const encrypted = encryptString(secret, content);
    const decrypted = decryptString(secret, encrypted);
    expect(decrypted).toBe(content);
  });

  test('decryptString should fail with incorrect secret', () => {
    const encrypted = encryptString(secret, content);
    expect(() => {
      decryptString('wrongSecretKey', encrypted);
    }).toThrow();
  });

  test('encryptString should throw error for short secret', () => {
    expect(() => {
      encryptString(shortSecret, content);
    }).toThrow(`Secret must be at least 8 characters long`);
  });

  test('decryptString should throw error for short secret', () => {
    const encrypted = encryptString(secret, content);
    expect(() => {
      decryptString(shortSecret, encrypted);
    }).toThrow(`Secret must be at least 8 characters long`);
  });
});
