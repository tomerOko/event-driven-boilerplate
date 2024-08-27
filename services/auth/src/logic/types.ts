import { SendPincodeRequest, SignupRequest, pathMap } from 'events-tomeroko3';
import z from 'zod';

export type SendPincodePayload = SendPincodeRequest['body'];

export type SignupPayload = SignupRequest['body'];
