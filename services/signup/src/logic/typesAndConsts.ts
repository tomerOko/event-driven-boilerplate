import z from 'zod';
import { paymentValidation } from './validations';

import {ObjectId} from 'mongodb'

export type Payment = z.infer<typeof paymentValidation>; 

