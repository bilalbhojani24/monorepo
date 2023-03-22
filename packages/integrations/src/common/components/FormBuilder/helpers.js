import { FIELDS_KEYS_TO_SHOW_AT_TOP } from './constants';

export const splitFields = (fields) =>
  fields?.reduce((accumulator, field) => {
    const buckets = accumulator;
    // build 3 buckets
    const SHOW_AT_TOP_BUCKET = 0;
    const REQUIRED_BUCKET = 1;
    const OPTIONAL_BUCKET = 2;
    const { key } = field;
    // build out bucket of fields that should be present at top
    const keyIdx = FIELDS_KEYS_TO_SHOW_AT_TOP.indexOf(key);
    if (keyIdx !== -1) {
      if (!buckets[SHOW_AT_TOP_BUCKET]) {
        // initiate empty bucket
        buckets[SHOW_AT_TOP_BUCKET] = new Array(
          FIELDS_KEYS_TO_SHOW_AT_TOP.length
        );
      }
      // push items inside bucket
      buckets[SHOW_AT_TOP_BUCKET][keyIdx] = field;
      return buckets;
    }

    const { required } = field;

    // split to required or optional bucket
    const bucketIdx = required ? REQUIRED_BUCKET : OPTIONAL_BUCKET;

    if (!buckets[bucketIdx]) {
      buckets[bucketIdx] = [];
    }
    buckets[bucketIdx].push(field);

    return buckets;
  }, []);
