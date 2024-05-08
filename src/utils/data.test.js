import { expect, test } from 'vitest';
import { readFileAsync, parseCSV, processHeaderName } from './data.js';

test('parseCSV should return an array of arrays', () => {
  const csvContent = '1,2,3\n4,5,6\n7,8,9';
  const result = parseCSV(csvContent);
  expect(result).toEqual([
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
  ]);
});

test('processHeaderName should capitalize each word and replace underscores with spaces', () => {
  const columnName = 'first_name';
  const result = processHeaderName(columnName);
  expect(result).toBe('First Name');
});
