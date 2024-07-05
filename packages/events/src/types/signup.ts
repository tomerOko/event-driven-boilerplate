import * as z from 'zod';
import { userCreated } from '../validations/signup';

export type NewUserEvent = z.infer<typeof userCreated>
