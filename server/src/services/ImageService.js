import fs from 'fs';
import util from 'util';
import { uploadFile, getFileStream } from '../s3.js';

const unlinkFile = util.promisify(fs.unlink);

class ImageService {
  async create(file) {
    const result = await uploadFile(file);
    await unlinkFile(file.path);
    return { imagePath: `/images/${result.key}` };
  }

  async getOne(key) {
    if (!key) {
      throw Error('Key not found');
    }
    return getFileStream(key);
  }
}

export default new ImageService();
