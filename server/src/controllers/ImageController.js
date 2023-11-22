import ImageService from '../services/ImageService.js';

class ImageController {
  async getOne(req, res) {
    try {
      const key = req.params.key;
      const readStream = await ImageService.getOne(key);
      readStream.pipe(res);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async create(req, res) {
    try {
      const file = req.file;
      const result = await ImageService.create(file);
      res.send(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteOne(req, res) {
    try {
      const key = req.params.key;
      const result = await ImageService.deleteOne(key);
      return result;
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new ImageController();
