import { Genre } from '../models/Genre.js';

export const getGenre = async (req, res, next) => {
   try {
      const genreList = Genre.all();
      return res.status(200).json({
         success: true,
         message: 'success',
         results: genreList,
      });
   } catch (error) {
      throw new Error(error);
   }
};
