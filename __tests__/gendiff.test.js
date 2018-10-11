import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const resultPathPretty = path.resolve(__dirname, '__fixtures__/resultPretty.txt');
const resultPathPlain = path.resolve(__dirname, '__fixtures__/resultPlain.txt');

const firstJSON = path.resolve(path.resolve(), __dirname, '__fixtures__/before.json');
const secondJSON = path.resolve(__dirname, '__fixtures__/after.json');

const firstYAML = path.resolve(path.resolve(), __dirname, '__fixtures__/before.yml');
const secondYAML = path.resolve(__dirname, '__fixtures__/after.yml');

const firstINI = path.resolve(path.resolve(), __dirname, '__fixtures__/before.ini');
const secondINI = path.resolve(__dirname, '__fixtures__/after.ini');

test('Get files diff', () => {
  const resultPretty = fs.readFileSync(resultPathPretty, 'utf-8');
  const resultPlain = fs.readFileSync(resultPathPlain, 'utf-8');
  expect(genDiff(firstJSON, secondJSON, 'pretty')).toBe(resultPretty);
  expect(genDiff(firstYAML, secondYAML, 'pretty')).toBe(resultPretty);
  expect(genDiff(firstINI, secondINI, 'pretty')).toBe(resultPretty);
  expect(genDiff(firstJSON, secondJSON, 'plain')).toBe(resultPlain);
  expect(genDiff(firstYAML, secondYAML, 'plain')).toBe(resultPlain);
  expect(genDiff(firstINI, secondINI, 'plain')).toBe(resultPlain);
});
