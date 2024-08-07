import { SignOptions, sign, verify } from 'jsonwebtoken';
import { z } from 'zod';

export type JwtOptions = Partial<Pick<SignOptions, 'algorithm' | 'expiresIn'>>;

const tokenSignError = 'INVALID_EXPIRATION';

export type TokenPayload = {
  ID: string;
};

export const signToken = (payload: TokenPayload, secret: string, options?: JwtOptions): string => {
  verifyCustomExpiration(options?.expiresIn);
  const signOptions: SignOptions = {
    algorithm: options?.algorithm || 'HS256',
    expiresIn: options?.expiresIn || '1d',
  };
  const token = sign(payload, secret, signOptions); //todo: move to env
  return token;
};

const verifyCustomExpiration = (expiration?: string | number): void => {
  if (!expiration) {
    return;
  }
  if (typeof expiration === 'number') {
    if (expiration < 0) {
      throw new Error(tokenSignError);
    }
    return;
  }
  if (typeof expiration === 'string') {
    const isGoodFormat = expiration.match(/^[0-9]+[smhd]$/);
    if (!isGoodFormat) {
      throw new Error(tokenSignError);
    }
    return;
  }
  throw new Error(tokenSignError);
};

export const tokenVerificationErrorMap = {
  TOKEN_BAD_SECRET: 'TOKEN_BAD_SECRET',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  ID_NOT_FOUND: 'ID_NOT_FOUND',
  UNKNOWN_TOKEN_ERROR: 'UNKNOWN_TOKEN_ERROR',
} as const;

export type TokenVerificationError = keyof typeof tokenVerificationErrorMap;

export const parseToken = (token: string, secret: string): TokenPayload => {
  try {
    const decoded = verify(token, secret);
    const { ID } = verifyTokenSchema.parse(decoded);
    return { ID };
  } catch (error) {
    const message = parseTokenError(error);
    throw new Error(message);
  }
};

const verifyTokenSchema = z.object({
  ID: z.string(),
});

const parseTokenError = (error: any): TokenVerificationError => {
  if (error.name) {
    switch (error.name) {
      case 'JsonWebTokenError':
        return tokenVerificationErrorMap.TOKEN_BAD_SECRET;
      case 'TokenExpiredError':
        return tokenVerificationErrorMap.TOKEN_EXPIRED;
    }
  }

  if (error instanceof z.ZodError) {
    return tokenVerificationErrorMap.ID_NOT_FOUND;
  }

  return tokenVerificationErrorMap.UNKNOWN_TOKEN_ERROR;
};
