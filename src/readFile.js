import fs from 'fs';
import path from 'path';

const readFile = (pathFile) => {
  const pathRel = path.relative('', pathFile);
  return { content: fs.readFileSync(pathRel, 'utf-8'), ext: path.extname(pathRel) };
};

export default readFile;
