import fs from 'fs';
import path from 'path';
import genDiff from '../src/genDiff';

const result = fs.readFileSync(path.resolve(__dirname, '__fixtures__/1result.txt'), 'utf-8');


const firstFile = path.resolve(path.resolve(),__dirname, '__fixtures__/1before.json');
const secondFile = path.resolve(__dirname, '__fixtures__/1after.json');


test('Get files diff', () => {
  expect(genDiff(firstFile, secondFile)).toBe(result);
});
