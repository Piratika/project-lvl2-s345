import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const resultPath = path.resolve(__dirname, '__fixtures__/result.txt');

const firstJSON = path.resolve(path.resolve(), __dirname, '__fixtures__/before.json');
const secondJSON = path.resolve(__dirname, '__fixtures__/after.json');

const firstYAML = path.resolve(path.resolve(), __dirname, '__fixtures__/before.yml');
const secondYAML = path.resolve(__dirname, '__fixtures__/after.yml');

const firstINI = path.resolve(path.resolve(), __dirname, '__fixtures__/before.ini');
const secondINI = path.resolve(__dirname, '__fixtures__/after.ini');

test('Get files diff for json file', () => {
  const result = fs.readFileSync(resultPath, 'utf-8');
  expect(genDiff(firstJSON, secondJSON, 'pretty')).toBe(result);
  expect(genDiff(firstYAML, secondYAML, 'pretty')).toBe(result);
  expect(genDiff(firstINI, secondINI, 'pretty')).toBe(result);
});
