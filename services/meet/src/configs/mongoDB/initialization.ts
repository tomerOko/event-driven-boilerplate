import { CollectionInitializerProps, collectionInitializer, functionWrapper } from 'common-lib-tomeroko3';
import { meetValidationProps } from 'events-tomeroko3';
import { Collection } from 'mongodb';
import { z } from 'zod';

const meetValidation = z.object(meetValidationProps);
export type Meet = z.infer<typeof meetValidation>;
const meetsInitializerProps: CollectionInitializerProps<Meet> = {
  collectionName: 'meets',
  documentSchema: meetValidation,
  indexSpecs: [{ key: { email: 1 }, unique: true }],
};
export let meetsCollection: Collection<Meet>;

export const initiateCollections = async () => {
  return functionWrapper(async () => {
    meetsCollection = await collectionInitializer(meetsInitializerProps);
  });
};
