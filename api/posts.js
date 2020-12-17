import client from "./client";

export const createPost = (post, onUploadProgress) => {
    console.log(post.tags);
    return client.post("/posts/createPost", post, {
        onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    });
};

export default {
  createPost,
};
