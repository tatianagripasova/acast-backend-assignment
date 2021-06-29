import download from 'download';
import { tmpdir } from 'os'
import { writeFileSync } from 'fs';
import path from 'path';
import md5File from 'md5-file';

/**
 * Calculates checksum.
 * @param url Url address of file.
 * @returns md5 hash of file.
 */
export const calculateChecksum = async(url: string) => {
  // Download .mp3 to tmp folder.
  const tempFile = path.join(
    tmpdir(),
    `${Math.random().toString(36)}.mp3`
  )
  writeFileSync(tempFile, await download(url));
  
  const hash =  md5File(tempFile);
  return hash;
}
