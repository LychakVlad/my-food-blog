import Post from '../models/Post.js';
import PostService from '../services/PostService.js';

class PostController {}

export default new PostController();

// async create(req, res) {
//   try {
//     const post = await PostService.create(req.body, req.files[0]);
//     res.json(post);
//     console.log(post);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// }

// async getAll(req, res) {
//   try {
//     const posts = await PostService.getAll();
//     return res.json(posts);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// }

// async getOne(req, res) {
//   try {
//     const post = await Post.findById(req.params.id);
//     return res.json(post);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// }

// async update(req, res) {
//   try {
//     const updatedPost = await PostService.update(req.body);
//     return res.json(updatedPost);
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// }

// async delete(req, res) {
//   try {
//     const post = PostService.delete(req.params.id);
//     return res.json(post);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// }
