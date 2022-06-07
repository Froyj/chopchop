import { extname } from 'path';

export const editFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname);
  callback(null, `${req.params.id}${fileExtName}`);
};
