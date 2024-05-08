import { expect, test } from 'vitest';
import { processHeaderName } from '../data.js';

test('processHeaderName should capitalize each word and replace underscores with spaces', () => {
  const columnName = 'first_name';
  const result = processHeaderName(columnName);
  expect(result).toBe('First Name');
});
