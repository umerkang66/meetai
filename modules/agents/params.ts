import { parseAsInteger, parseAsString, createLoader } from 'nuqs/server';
import { DEFAULT_PAGE } from '@/constants';

export const agentsFilterSearchParams = {
  search: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  page: parseAsInteger
    .withDefault(DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
};

export const loadAgentsFilterParams = createLoader(agentsFilterSearchParams);
