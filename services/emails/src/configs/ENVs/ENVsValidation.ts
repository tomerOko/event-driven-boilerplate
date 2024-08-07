import { AppError, NodeEnvironment, formatZodError, nodeEnvironments } from 'common-lib-tomeroko3';
import { ZodError, z } from 'zod';

import { appErrorCodes } from '../../logic/appErrorCodes';

/**
 * REMEMBER:
 * env's will always be strings, so we can and should use transform in case of numbers / booleans / objects. but the basic validation is always a string.
 */
const ENVsValidationSchema = z.object({
  //TODO: add to config map
  NODE_ENV: z
    .string()
    .refine((value) => value in nodeEnvironments)
    .transform((value) => value as NodeEnvironment)
    .describe(
      `Environment variables are designed to adapt the system's behavior to the environment in which
        it runs. A significant part of the behavior is determined by the type of environment
        (see 'nodeEnvironments' dictionary ). This variable defines the type of the environment.
        **important**
        this is the only environment variable that is comes from the run command (made by the container entrypoint / npm script / dubugger fonfiguration)
        it's made this way so that the program will know how to consumen the rest of the environment variables.
        if we run the program locally outside of the container and cluster, we will use the variables on the .env file (because we can't use k8s config maps and secrets locally)
        if we run the program in the cluster, we will use the variables from the config maps and secrets (because we can't use .env files in the cluster)
        `,
    ),
  PORT: z
    .string()
    .default('3000')
    .transform((value) => value)
    .describe(
      'The port on which the server will run, defaults to 3000 (a standard application port, because we use k8s services, all apps can simply listen on port 3000)',
    ),
  STRING_ENCRYPTION_SECRET: z.string().describe('a secret key used to encrypt and decrypt strings'),
  JWT_SECRET: z.string().describe('a secret key used to sign and verify JWT tokens'),
  RABBITMQ_HOST: z
    .string()
    .default('rabbitmq')
    .describe(
      `The host on which we can connect to RabbitMQ, it is usually the name of the service 
      in the kubernetes cluster, here the service is usually defined by the helm chart 
      automatically so if the connection is not expternal to cluster (and the the host should be 'localhost' 
      than it should probably be 'rabbitmq' (helm chart default)`,
    ),
  RABBITMQ_PORT: z.string().default('5672').describe('The port on which we can connect to RabbitMQ'),
  RABBITMQ_USERNAME: z.string().describe('The username to connect to RabbitMQ, defined in the terraform resource'),
  RABBITMQ_PASSWORD: z.string().describe('The password to connect to RabbitMQ, defined in the terraform resource'),
  EMAIL_ADDRESS: z.string().describe('The email address from which the emails will be sent'),
  EMAIL_PASSWORD: z.string().describe('The password of the email address from which the emails will be sent'),
});

export const envsValidation = (providedENVs: Record<string, string | undefined>) => {
  try {
    const result = ENVsValidationSchema.parse(providedENVs);
    return result;
  } catch (error) {
    const formattedErrorObject = formatZodError(error as ZodError);
    /* we use console.error here instead of importing the logger to avoid circular dependencies */
    console.error(JSON.stringify(formattedErrorObject));
    throw new AppError(appErrorCodes.CONFIG_VALIDATION_ERROR, formattedErrorObject);
  }
};
