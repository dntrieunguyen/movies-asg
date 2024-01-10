import fs from 'fs';
export const Video = {
   all: function () {
      return JSON.parse(fs.readFileSync('./data/videoList.json', 'utf8'));
   },
};
