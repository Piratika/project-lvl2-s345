import fs from 'fs';
import path from 'path';
import parse from './parsers';
import render from './renderers/render';
import gendiff from './genDiff';

const readFile = (pathFile) => {
  const pathRel = path.relative('', pathFile);
  return { content: fs.readFileSync(pathRel, 'utf-8'), ext: path.extname(pathRel) };
};

export default (path1, path2, format) => {
  const file1 = readFile(path1);
  const file2 = readFile(path2);
  const obj1 = parse(file1.ext, file1.content);
  const obj2 = parse(file2.ext, file2.content);
  return render(gendiff(obj1, obj2), format);
};
