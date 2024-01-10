import React from 'react';

import './SearchResult.css';

const base_url = 'https://image.tmdb.org/t/p/original';

const SearchResult = ({ movies }) => {
   return (
      <div className="row">
         <h2>Search Result</h2>
         <div className="row_posters search-resul-container sc2">
            {movies?.map(movie => {
               return (
                  <img
                     key={movie.id}
                     className={`row_poster row_posterLarge`}
                     src={`${base_url}${movie.poster_path}`}
                     alt={movie.name}
                  />
               );
            })}
         </div>
      </div>
   );
};

export default SearchResult;