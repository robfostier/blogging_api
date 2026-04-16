import Post from './post.model.js';

export const createPost = async (postData) => {
    const newPost = new Post(postData);
    return await newPost.save();
};

export const getAllPosts = async (filter) => {
    return await Post.find(filter).sort({ createdAt: -1 });
};

export const getPostById = async (id) => {
    return await Post.findById(id);
};

export const updatePost = async (id, updateData) => {
    return await Post.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

export const deletePost = async (id) => {
    return await Post.findByIdAndDelete(id);
};