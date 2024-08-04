/**
 * mock config for environment variables instead of secretes and config maps (just for now)
 */
export const envsMock: Record<string, string> = {
  NODE_ENV: 'DEV',
  STRING_ENCRYPTION_SECRET: 'string_encryption_secret',
  SERVICE_ROUTE: 'emails',
  JWT_SECRET: 'jwt_secret',
  RABBITMQ_HOST: 'rabbitmq',
  RABBITMQ_PORT: '5672',
  RABBITMQ_USERNAME: 'user',
  RABBITMQ_PASSWORD: 'password',
};
