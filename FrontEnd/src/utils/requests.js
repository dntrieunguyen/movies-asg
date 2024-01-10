const requests = {
   fetchTrending: `http://localhost:8800/api/movie/trending`,
   fetchNetflixOriginals: `http://localhost:8800/api/movie/discover?genre=37`,
   fetchTopRated: `http://localhost:8800/api/movie/top_rate`,
   fetchActionMovies: `http://localhost:8800/api/movie/discover?genre=28`,
   fetchComedyMovies: `http://localhost:8800/api/movie/discover?genre=35`,
   fetchHorrorMovies: `http://localhost:8800/api/movie/discover?genre=27`,
   fetchRomanceMovies: `http://localhost:8800/api/movie/discover?genre=10749`,
   fetchDocumentaries: `http://localhost:8800/api/movie/discover?genre=99`,
   fetchSearch: `http://localhost:8800/api/movie/search`,
   fetchGenre: 'http://localhost:8800/api/genre',
};

export default requests;
