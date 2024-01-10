import movie from './movie.js';
import genre from './genre.js';
export const initRoutes = app => {
   app.use('/api/movie', movie);
   app.use('/api/genre', genre);
};
