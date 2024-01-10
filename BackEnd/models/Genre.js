import fs from 'fs';
export const Genre = {
   all: function () {
      return JSON.parse(fs.readFileSync('./data/genreList.json', 'utf8'));
   },
};
