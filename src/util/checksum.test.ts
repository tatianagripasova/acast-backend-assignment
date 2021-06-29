import { calculateChecksum } from './checksum';

const testUrl = 'https://sphinx.acast.com/varvet/kortversion-474madeleinemartin/media.mp3';
const resultChecksum = '87f3cfd61ac8115707a90ff70742f781';

jest.setTimeout(20000);

test('should return checksum for a valid Url', async () => {
  const result = await calculateChecksum(testUrl);
  expect(result).toBe(resultChecksum);
});

test('should return error if checksum could not be calculated', async () => {
  try {
    await calculateChecksum('');
  } catch (e) {
    expect(e.message).toMatch('Invalid URL');
  }
});
