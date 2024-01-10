import React, { useEffect, useState } from 'react';

import Nav from '../../components/browse/Nav';
import SearchResult from '../../components/search/SearchResult';
import './Search.css';
import axios from 'axios';
import requests from '../../utils/requests';

const Search = () => {
   const [movies, setMovies] = useState([]);
   const [genreOption, setGenreOption] = useState([]);
   const [queryOption, setQueryOption] = useState({
      keyword: '',
      genre: '',
      mediaType: '',
      language: '',
      year: '',
   });

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get(requests.fetchGenre);
            setGenreOption(response?.data?.results);
         } catch (error) {
            console.error(error);
         }
      };
      fetchData();
   }, []);

   const handleSearch = async () => {
      const { keyword, genre, mediaType, language, year } = queryOption;
      if (keyword?.length === 0) alert('enter keywords');

      const baseURL = 'http://localhost:8800/api/movie/video/search';
      const searchURL = `${baseURL}?keyword=${keyword}&genre=${genre}&media_type=${mediaType}&language=${language}&year=${year}`;

      try {
         const responses = await axios.post(
            searchURL,
            {},
            {
               headers: {
                  Authorization: 'Bearer 8qlOkxz4wq',
               },
            },
         );
         setMovies(responses?.data?.result);
         // Xử lý dữ liệu trả về từ API
      } catch (error) {
         console.error(error);
         // Xử lý lỗi
      }
   };

   const handleQueryOptions = e => {
      const { name, value } = e.target;
      setQueryOption(query => ({
         ...query,
         [name]: value,
      }));
   };

   const resetSearch = () => {
      setQueryOption({
         keyword: '',
         genre: '',
         mediaType: '',
         language: '',
         year: '',
      });
   };

   return (
      <div className="app">
         <Nav />
         <div className="s009">
            <form>
               <div className="inner-form">
                  <div className="basic-search">
                     <div className="input-field">
                        <input
                           type="text"
                           placeholder="Type Keywords"
                           onChange={e => handleQueryOptions(e)}
                           name="keyword"
                           value={queryOption.keyword}
                        />

                        <div className="more_options">
                           <select
                              name="genre"
                              onChange={e => handleQueryOptions(e)}
                              value={queryOption.genre}
                           >
                              <option value="">Select Genre</option>
                              {genreOption &&
                                 genreOption?.map(genre => (
                                    <option key={genre.id} value={genre.id}>
                                       {genre.name}
                                    </option>
                                 ))}
                           </select>
                           <select
                              onChange={e => handleQueryOptions(e)}
                              value={queryOption.mediaType}
                              name="mediaType"
                           >
                              <option value="">Select Media Type</option>
                              {['all', 'movie', 'tv', 'person']?.map(
                                 (type, index) => (
                                    <option key={index} value={type}>
                                       {type}
                                    </option>
                                 ),
                              )}
                           </select>
                           <select
                              onChange={e => handleQueryOptions(e)}
                              value={queryOption.language}
                              name="language"
                           >
                              <option value="">Select Language</option>
                              {['en', 'ja', 'ko']?.map((language, index) => (
                                 <option key={index} value={language}>
                                    {language}
                                 </option>
                              ))}
                           </select>
                           <input
                              type="text"
                              name="year"
                              id=""
                              placeholder="year"
                              onChange={e => handleQueryOptions(e)}
                              value={queryOption.year}
                           />
                        </div>
                        <div className="icon-wrap">
                           <svg
                              className="svg-inline--fa fa-search fa-w-16"
                              fill="#ccc"
                              aria-hidden="true"
                              data-prefix="fas"
                              data-icon="search"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                           >
                              <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                           </svg>
                        </div>
                     </div>
                  </div>
                  <div className="advance-search">
                     <div className="row third">
                        <div className="input-field">
                           <div className="result-count"></div>
                           <div className="group-btn">
                              <button
                                 className="btn-delete"
                                 onClick={resetSearch}
                                 type="button"
                              >
                                 RESET
                              </button>
                              <button
                                 className="btn-search"
                                 type="button"
                                 onClick={() => handleSearch()}
                              >
                                 SEARCH
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </form>
         </div>
         <SearchResult movies={movies} />
      </div>
   );
};

export default Search;
