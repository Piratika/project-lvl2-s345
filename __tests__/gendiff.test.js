import fs from 'fs';
import path from 'path';
import genDiff from '../src/genDiff';

const resultPath = path.resolve(__dirname, '__fixtures__/result.txt');

const firstJSON = path.resolve(path.resolve(), __dirname, '__fixtures__/1before.json');
const secondJSON = path.resolve(__dirname, '__fixtures__/1after.json');

const firstYAML = path.resolve(path.resolve(), __dirname, '__fixtures__/2before.yml');
const secondYAML = path.resolve(__dirname, '__fixtures__/2after.yml');

test('Get files diff for json file', () => {
  const result = fs.readFileSync(resultPath, 'utf-8');
  expect(genDiff(firstJSON, secondJSON, 'pretty')).toBe(result);
});

test('Get files diff for yaml file', () => {
  const result = fs.readFileSync(resultPath, 'utf-8');
  expect(genDiff(firstYAML, secondYAML, 'pretty')).toBe(result);
});
