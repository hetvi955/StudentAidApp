import client from "./client";

const getPublicPosts = () => client.get("/posts/publicPosts");

const deletePost = (id) => client.delete(`/posts/deletePost/${id}`);

const likePost = (id) => client.get(`/posts/votePost/${id}`);

export const createPost = (post, onUploadProgress) => {
  return client.post("/posts/createPost", post, {
    onUploadProgress: (progress) =>
    onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  createPost,
  getPublicPosts,
  likePost,
  deletePost,
};
