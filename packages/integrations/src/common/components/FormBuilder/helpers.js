export const splitFields = (fields) =>
  fields?.reduce((accumulator, field) => {
    const buckets = accumulator;
    const SHOW_AT_TOP_BUCKET = 0;
    const REQUIRED_BUCKET = 1;
    const OPTIONAL_BUCKET = 2;
    const FIELDS_KEYS_TO_SHOW_AT_TOP = [
      'assignee',
      'summary',
      'description',
      'attachment'
    ];
    const { key } = field;
    const keyIdx = FIELDS_KEYS_TO_SHOW_AT_TOP.indexOf(key);
    if (keyIdx !== -1) {
      if (!buckets[SHOW_AT_TOP_BUCKET]) {
        buckets[SHOW_AT_TOP_BUCKET] = new Array(
          FIELDS_KEYS_TO_SHOW_AT_TOP.length
        );
      }
      buckets[SHOW_AT_TOP_BUCKET][keyIdx] = field;
      return buckets;
    }

    const { required } = field;

    const bucketIdx = required ? REQUIRED_BUCKET : OPTIONAL_BUCKET;

    if (!buckets[bucketIdx]) {
      buckets[bucketIdx] = [];
    }
    buckets[bucketIdx].push(field);

    return buckets;
  }, []);
