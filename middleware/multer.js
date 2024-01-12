const multer = require('multer');

// Create a Multer middleware with memory storage
const upload = multer({ storage: multer.memoryStorage() });
module.exports = {
  multer: upload
};
