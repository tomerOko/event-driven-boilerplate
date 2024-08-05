import { validateRequest } from 'common-lib-tomeroko3';
import { pathMap } from 'events-tomeroko3';
import express from 'express';

import * as controller from './controller';

export const router = express.Router();

router.get('/test', controller.test);

const search = pathMap['SEARCH'];
router.post(search.path, validateRequest(search.requestValidation, search.responseValidation), controller.sendPincode);

const searchWithFilters = pathMap['SEARCH_WITH_FILTERS'];
router.post(
  searchWithFilters.path,
  validateRequest(searchWithFilters.requestValidation, searchWithFilters.responseValidation),
  controller.signup,
);
