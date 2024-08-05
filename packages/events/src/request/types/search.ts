import * as z from 'zod';
import {
  searchRequestValidation,
  searchResponseValidation,
  searchWithFiltersRequestValidation,
  searchWithFiltersResponseValidation,
} from '../validation/search';

export type searchRequestType = z.infer<typeof searchRequestValidation>;
export type searchResponseType = z.infer<typeof searchResponseValidation>;

export type searchWithFiltersRequestType = z.infer<typeof searchWithFiltersRequestValidation>;
export type searchWithFiltersResponseType = z.infer<typeof searchWithFiltersResponseValidation>;
