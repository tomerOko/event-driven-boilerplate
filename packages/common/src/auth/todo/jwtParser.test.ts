import { signPayload, tokenVerificationErrorMap, verifyToken } from './jwtParser'; // Replace with the actual path to your module
import { sign, verify, decode } from 'jsonwebtoken';

describe('JWT Utilities', () => {
  const secret = 'test_secret';
  const email = 'test@example.com';

  describe('signPayload', () => {
    it('should sign a payload and return a token', () => {
      const token = signPayload(email, secret);
      expect(token).toBeDefined();
      const decoded = verify(token, secret);
      expect(decoded).toHaveProperty('email', email);
    });

    it('should sign a payload with custom expiration', () => {
      const token = signPayload(email, secret, { expiresIn: '2h' });
      expect(token).toBeDefined();
      const decoded = verify(token, secret);
      expect(decoded).toHaveProperty('email', email);
    });

    it('should sign a payload with default algorithm HS256', () => {
      const token = signPayload(email, secret);
      const decoded: any = decode(token, { complete: true });
      expect(decoded?.header.alg).toBe('HS256');
    });

    it('should sign a payload with custom expiration', () => {
      expect(() => signPayload(email, secret, { expiresIn: '1s' })).not.toThrow();
      expect(() => signPayload(email, secret, { expiresIn: '1m' })).not.toThrow();
      expect(() => signPayload(email, secret, { expiresIn: '1h' })).not.toThrow();
      expect(() => signPayload(email, secret, { expiresIn: '1d' })).not.toThrow();
      expect(() => signPayload(email, secret, { expiresIn: 100 })).not.toThrow();
      // in case of 0, token expiration is set to default 1d
      expect(() => signPayload(email, secret, { expiresIn: 0 })).not.toThrow();
    });

    it('should throw error for invalid expiration', () => {
      expect(() => signPayload(email, secret, { expiresIn: 'hallow' })).toThrow('INVALID_EXPIRATION');
      expect(() => signPayload(email, secret, { expiresIn: '-1d' })).toThrow('INVALID_EXPIRATION');
      expect(() => signPayload(email, secret, { expiresIn: '1w' })).toThrow('INVALID_EXPIRATION');
      expect(() => signPayload(email, secret, { expiresIn: -5 })).toThrow('INVALID_EXPIRATION');
    });
  });

  describe('Token Verification', () => {
    it('should successfully verify a valid token', () => {
      const token = signPayload(email, secret);
      const verifiedEmail = verifyToken(token, secret);
      expect(verifiedEmail).toBe(email);
    });

    const wait2Seconds = () => new Promise((resolve) => setTimeout(resolve, 2000));

    it('should successfully verify a valid token asynchronously', async () => {
      const token = signPayload(email, secret);
      await wait2Seconds();
      const verifiedEmail = verifyToken(token, secret);
      expect(verifiedEmail).toBe(email);
    });

    it('should throw TOKEN_BAD_SECRET for an invalid secret', () => {
      const token = signPayload(email, secret);
      expect(() => verifyToken(token, 'wrongsecret')).toThrowError(tokenVerificationErrorMap.TOKEN_BAD_SECRET);
    });

    it('should throw TOKEN_EXPIRED for an expired token', async () => {
      const token = signPayload(email, secret, { expiresIn: '1s' });
      await wait2Seconds();
      expect(() => verifyToken(token, secret)).toThrow(tokenVerificationErrorMap.TOKEN_EXPIRED);
    });

    it('should throw EMAIL_NOT_FOUND for a token with missing email', () => {
      const malformedToken = sign({}, secret);
      expect(() => verifyToken(malformedToken, secret)).toThrowError(tokenVerificationErrorMap.EMAIL_NOT_FOUND);
    });
  });
});
