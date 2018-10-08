import fs from 'fs';
import path from 'path';

const readFile = pathFile => JSON.parse(fs.readFileSync(path.relative('', pathFile), 'utf-8'));

export default readFile;
