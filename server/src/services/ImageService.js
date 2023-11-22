import fs from 'fs';
import util from 'util';
import { uploadFile, getFileStream, deleteFile } from '../s3.js';

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

  async deleteOne(key) {
    if (!key) {
      throw Error('Key not found');
    }

    return deleteFile(key);
  }
}

export default new ImageService();
