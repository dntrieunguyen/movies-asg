import { User } from '../models/User.js';

export const verifyToken = async (req, res, next) => {
   try {
      // Lấy token từ header của request
      const token = req?.headers?.authorization?.split('Bearer ')[1];

      // Kiểm tra xem token có tồn tại không
      if (!token)
         return res.status(400).json({
            success: false,
            message: 'Authorization require',
         });

      // Lấy danh sách tất cả người dùng
      const userList = User.all();

      // Kiểm tra xem token có tồn tại trong danh sách người dùng không
      const checkToken = userList.find(user => user.token === token);

      // Nếu không tìm thấy token trong danh sách người dùng, trả về lỗi Unauthorized
      if (!checkToken)
         return res.status(401).json({
            success: false,
            message: 'Unauthorized',
         });

      // Nếu token hợp lệ, chuyển sang middleware tiếp theo
      next();
   } catch (error) {
      // Nếu có lỗi xảy ra, ném ra ngoại lệ để được xử lý ở middleware tiếp theo
      console.log(error);
   }
};
