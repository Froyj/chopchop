export const imageFileFilter = (req, file, callback) => {
  if (!file.originalName.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only images files are allowed'), false);
  }
  callback(null, true);
};
