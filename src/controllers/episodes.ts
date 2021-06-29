import { Request, Response, NextFunction } from 'express';
import Parser from 'rss-parser';

import { calculateChecksum } from '../util/checksum';

let parser = new Parser();

export const getEpisodes = async(req: Request, res: Response, next: NextFunction) => {
  try {
    let podcasts = await parser.parseURL('https://rss.acast.com/varvet');
    if(!podcasts) {
      next(new Error('No podcasts.'))
    } else {
      let result = [];
      for(let i = 0; i < 1/*podcasts.items.length*/; i++) {
        const item = podcasts.items[i];
        const title = item.title;
        const url = item.enclosure!.url;
        const checksum = await calculateChecksum(url);
        result.push({ title, url, checksum });
      }
      res.send(result);
    }
  } catch(err) {
    console.log('err', err);
    next(err);
  }
}
