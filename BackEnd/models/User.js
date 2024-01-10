import fs from 'fs';
export const User = {
   all: function () {
      return JSON.parse(fs.readFileSync('./data/userToken.json', 'utf8'));
   },
};
