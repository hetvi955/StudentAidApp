import client from "./client";

const getPublicPosts = () => client.get("/posts/publicPosts");

export const createPost = (post, onUploadProgress) => {
    return client.post("/posts/createPost", post, {
        onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    });
};

export default {
  createPost,
  getPublicPosts,
};
