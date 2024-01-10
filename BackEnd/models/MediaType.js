import fs from 'fs';

export const MediaType = {
   all: function () {
      return JSON.parse(fs.readFileSync('./data/mediaType.json', 'utf8'));
   },
};
