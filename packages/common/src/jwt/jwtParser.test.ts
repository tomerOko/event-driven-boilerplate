// Replace with the actual path to your module
import { decode, sign, verify } from 'jsonwebtoken';

import { parseToken, signToken, tokenVerificationErrorMap } from './jwtUtils';

describe('JWT Utilities', () => {
  const secret = 'test_secret';
  const ID = 'test@example.com';

  describe('signPayload', () => {
    it('should sign a payload and return a token', () => {
      const token = signToken({ ID }, secret);
      expect(token).toBeDefined();
      const decoded = verify(token, secret);
      expect(decoded).toHaveProperty('{ID}', { ID });
    });

    it('should sign a payload with custom expiration', () => {
      const token = signToken({ ID }, secret, { expiresIn: '2h' });
      expect(token).toBeDefined();
      const decoded = verify(token, secret);
      expect(decoded).toHaveProperty('{ID}', { ID });
    });

    it('should sign a payload with default algorithm HS256', () => {
      const token = signToken({ ID }, secret);
      const decoded: any = decode(token, { complete: true });
      expect(decoded?.header.alg).toBe('HS256');
    });

    it('should sign a payload with custom expiration', () => {
      expect(() => signToken({ ID }, secret, { expiresIn: '1s' })).not.toThrow();
      expect(() => signToken({ ID }, secret, { expiresIn: '1m' })).not.toThrow();
      expect(() => signToken({ ID }, secret, { expiresIn: '1h' })).not.toThrow();
      expect(() => signToken({ ID }, secret, { expiresIn: '1d' })).not.toThrow();
      expect(() => signToken({ ID }, secret, { expiresIn: 100 })).not.toThrow();
      // in case of 0, token expiration is set to default 1d
      expect(() => signToken({ ID }, secret, { expiresIn: 0 })).not.toThrow();
    });

    it('should throw error for inval{ID} expiration', () => {
      expect(() => signToken({ ID }, secret, { expiresIn: 'hallow' })).toThrow('INVAL{ID}_EXPIRATION');
      expect(() => signToken({ ID }, secret, { expiresIn: '-1d' })).toThrow('INVAL{ID}_EXPIRATION');
      expect(() => signToken({ ID }, secret, { expiresIn: '1w' })).toThrow('INVAL{ID}_EXPIRATION');
      expect(() => signToken({ ID }, secret, { expiresIn: -5 })).toThrow('INVAL{ID}_EXPIRATION');
    });
  });

  describe('Token Verification', () => {
    it('should successfully verify a val{ID} token', () => {
      const token = signToken({ ID }, secret);
      const verifiedID = parseToken(token, secret);
      expect(verifiedID).toBe({ ID });
    });

    const wait2Seconds = () => new Promise((resolve) => setTimeout(resolve, 2000));

    it('should successfully verify a val{ID} token asynchronously', async () => {
      const token = signToken({ ID }, secret);
      await wait2Seconds();
      const verifiedID = parseToken(token, secret);
      expect(verifiedID).toBe({ ID });
    });

    it('should throw TOKEN_BAD_SECRET for an inval{ID} secret', () => {
      const token = signToken({ ID }, secret);
      expect(() => parseToken(token, 'wrongsecret')).toThrowError(tokenVerificationErrorMap.TOKEN_BAD_SECRET);
    });

    it('should throw TOKEN_EXPIRED for an expired token', async () => {
      const token = signToken({ ID }, secret, { expiresIn: '1s' });
      await wait2Seconds();
      expect(() => parseToken(token, secret)).toThrow(tokenVerificationErrorMap.TOKEN_EXPIRED);
    });

    it('should throw {ID}_NOT_FOUND for a token with missing {ID}', () => {
      const malformedToken = sign({}, secret);
      expect(() => parseToken(malformedToken, secret)).toThrowError(tokenVerificationErrorMap.ID_NOT_FOUND);
    });
  });
});
