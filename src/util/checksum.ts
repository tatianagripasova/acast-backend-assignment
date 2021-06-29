import download from 'download';
import { tmpdir } from 'os'
import { writeFileSync } from 'fs';
import path from 'path';
import md5File from 'md5-file';

export const calculateChecksum = async(url: string) => {

  const tempFile = path.join(
    tmpdir(),
    `${Math.random().toString(36)}.mp3`
  )

  writeFileSync(tempFile, await download(url));
  
  const hash =  md5File(tempFile);
  return hash;
}
