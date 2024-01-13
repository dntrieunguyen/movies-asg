import { Movies } from '../models/Movie.js';
import { Genre } from '../models/Genre.js';
import { paginate } from '../utils/paging.js';
import { Video } from '../models/Video.js';

export const getTrending = async (req, res, next) => {
   try {
      // Lấy danh sách tất cả các phim
      const movies = Movies.all();

      // Sắp xếp danh sách phim theo thứ tự giảm dần của mức độ phổ biến (popularity)
      const filterMovies = movies.sort((a, b) =>
         a.popularity < b.popularity ? 1 : b.popularity < a.popularity ? -1 : 0,
      );

      // Định nghĩa kích thước trang và số trang hiện tại từ query parameter của request
      const page_size = 20;
      const page_number = +req.query.page ? +req.query.page : 1;

      // Trả về một response thành công với dữ liệu đã được phân trang
      return res.status(200).json({
         results: paginate(filterMovies, page_size, page_number),
         page: page_number,
         total_pages: Math.ceil(filterMovies.length / 20),
      });
   } catch (error) {
      // Nếu có lỗi xảy ra, ném ra ngoại lệ để được xử lý ở middleware tiếp theo
      throw new Error(error);
   }
};

export const getTopRate = async (req, res, next) => {
   try {
      // Lấy danh sách tất cả các phim
      const movies = Movies.all();

      // Sắp xếp danh sách phim theo tỷ lệ đánh giá từ cao đến thấp
      const filterMovies = movies.sort((a, b) =>
         a.vote_average < b.vote_average
            ? 1
            : b.vote_average < a.vote_average
            ? -1
            : 0,
      );

      // Định nghĩa số lượng phim trên mỗi trang và số trang hiện tại
      const page_size = 20;
      const page_number = +req.query.page ? +req.query.page : 1;

      // Trả về kết quả phim được phân trang, số trang hiện tại và tổng số trang
      return res.status(200).json({
         results: paginate(filterMovies, page_size, page_number),
         page: page_number,
         total_pages: Math.ceil(filterMovies.length / 20),
      });
   } catch (error) {
      // Xử lý lỗi nếu có
      throw new Error(error);
   }
};
export const getDiscover = async (req, res, next) => {
   try {
      // Lấy danh sách tất cả các phim
      const movies = Movies.all();

      // Kiểm tra xem có tồn tại tham số genre trong query không
      if (Object.keys(req.query).length === 0) {
         return res.status(400).json({
            success: false,
            message: 'Not found genre param',
         });
      }

      // Tách chuỗi genre thành một mảng các id genre
      const genreQuery = req.query.genre.split(',');

      // Lấy danh sách tất cả các genre
      const genreList = Genre.all();

      // Tạo một mảng chứa tất cả các id của genre
      const idArr = genreList.map(item => item.id);

      // Tìm các genre id không tồn tại trong danh sách genre và lưu vào mảng notFoundId
      let notFoundId = [];
      for (const id of genreQuery) {
         if (!idArr.includes(+id)) notFoundId.push(+id);
      }

      // Nếu có genre id không tồn tại, trả về thông báo lỗi
      if (notFoundId.length !== 0) {
         return res.status(400).json({
            success: false,
            message: `Not found genre id ${notFoundId.join(', ')}`,
         });
      }

      // Lấy tên của các genre dựa trên genre id và ghép thành một chuỗi
      const genre_name = genreList
         .filter(list => {
            for (const id of genreQuery) {
               if (list.id === +id) {
                  return true;
               }
            }
            return false;
         })
         .map(genre => genre.name)
         .join(', ');

      // Lọc danh sách phim dựa trên genre id
      const genreMovies = movies.filter(movie => {
         for (const genre of genreQuery) {
            if (movie.genre_ids.includes(+genre)) {
               return true;
            }
         }
         return false;
      });

      // Định nghĩa số lượng phim trên mỗi trang và số trang hiện tại
      const page_size = 20;
      const page_number = +req.query.page ? +req.query.page : 1;

      // Trả về kết quả phim được phân trang, số trang hiện tại, tổng số trang và tên của các genre
      return res.status(200).json({
         results: paginate(genreMovies, page_size, page_number),
         page: page_number,
         total_pages: Math.ceil(genreMovies.length / 20),
         genre_name: genre_name,
      });
   } catch (error) {
      // Xử lý lỗi nếu có
      throw new Error(error);
   }
};

export const getVideo = async (req, res, next) => {
   try {
      // Lấy film_id từ params
      const film_id = +req.body.id;

      // Kiểm tra xem film_id có tồn tại không
      if (!film_id)
         return res.status(400).json({
            success: false,
            message: 'Not found film_id param',
         });

      // Lấy danh sách tất cả các video
      const videoList = Video.all();

      // Lọc danh sách video dựa trên film_id
      const filterVideos = videoList
         ?.filter(video => video.id === film_id)
         ?.map(video => video.videos)
         ?.shift()
         ?.filter(video => video.official === true && video.site === 'YouTube')
         ?.filter(video => ['Trailer', 'Teaser'].includes(video.type))
         ?.sort((a, b) => {
            const typeComparison = b.type.localeCompare(a.type);
            if (typeComparison !== 0) {
               return typeComparison;
            }
            const dateA = Date.parse(a.published_at);
            const dateB = Date.parse(b.published_at);
            return dateB - dateA;
         })
         ?.shift();

      // Kiểm tra nếu không tìm thấy video, trả về thông báo lỗi
      if (!filterVideos)
         return res.status(404).json({
            success: false,
            message: 'Not found video',
         });

      // Trả về kết quả video
      return res.status(200).json({
         success: true,
         message: 'Lấy dữ liệu thành công',
         result: filterVideos,
      });
   } catch (error) {
      // Xử lý lỗi nếu có
      throw new Error(error);
   }
};

export const search = async (req, res, next) => {
   try {
      // Lấy danh sách tất cả các phim
      const movieList = Movies.all();

      // Lấy các tham số từ query, bao gồm keyword, page, genre, media_type, language và year
      const { keyword, page, genre, media_type, language, year } = req.body;
      console.log(req.body);

      // Kiểm tra xem keyword có tồn tại không
      if (!keyword)
         return res.status(400).json({
            success: false,
            message: 'Not found keyword param',
         });

      // Lọc danh sách phim dựa trên các điều kiện tìm kiếm
      const filterMovies = movieList
         .filter(
            movie =>
               movie?.overview
                  ?.toLowerCase()
                  ?.includes(keyword?.replace(/\s+/g, ' ')?.toLowerCase()) ||
               movie?.title
                  ?.toLowerCase()
                  ?.includes(keyword?.replace(/\s+/g, ' ')?.toLowerCase()),
         )
         .filter(movie =>
            genre && genre?.trim() !== ''
               ? movie?.genre_ids?.includes(+genre)
               : true,
         )
         .filter(movie =>
            media_type && media_type?.trim() !== ''
               ? movie?.media_type?.includes(media_type)
               : true,
         )
         .filter(movie =>
            language && language?.trim() !== ''
               ? movie?.original_language?.includes(language)
               : true,
         )
         .filter(
            year && year?.trim() !== ''
               ? movie => movie?.release_date?.split('-')[0] === year
               : () => true,
         );

      // Định nghĩa số lượng phim trên mỗi trang và số trang hiện tại
      const page_number = +page || 1;
      const page_size = 20;

      // Trả về kết quả phim được phân trang, số trang hiện tại và tổng số trang
      return res.status(200).json({
         success: true,
         message: 'Lấy dữ liệu thành công',
         result: paginate(filterMovies, page_size, page_number),
         page: page_number,
         total_pages: Math.ceil(filterMovies.length / page_size),
      });
   } catch (error) {
      // Xử lý lỗi nếu có
      throw new Error(error);
   }
};
