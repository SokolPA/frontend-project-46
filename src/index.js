import _ from 'lodash';
import path from 'node:path';
import fs from 'node:fs';

const gendiff = (path1, path2) => {
  let pathFixt1 = path1;
  let pathFixt2 = path2;

  if (!path1.includes('__fixtures__/')) { pathFixt1 = `__fixtures__/${path1}`; }
  if (!path2.includes('__fixtures__/')) { pathFixt2 = `__fixtures__/${path2}`; }

  const absPath1 = path.resolve(process.cwd(), pathFixt1);
  const absPath2 = path.resolve(process.cwd(), pathFixt2);

  const file1 = fs.readFileSync(absPath1, 'utf-8');
  const file2 = fs.readFileSync(absPath2, 'utf-8');

  const data1 = JSON.parse(file1);
  const data2 = JSON.parse(file2);

  const uniqKeys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

  let result = '';

  for (const key of uniqKeys) {
    if (!Object.hasOwn(data1, key)) { result += `  + ${key}: ${data2[key]}\n`; }
    if (!Object.hasOwn(data2, key)) { result += `  - ${key}: ${data1[key]}\n`; }
    if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      if (data1[key] === data2[key]) {
        result += `    ${key}: ${data2[key]}\n`;
      } else {
        result += `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}\n`;
      }
    }
  }
  return `{\n${result}}`;
};

export default gendiff;
