//! Business logic for likes routes
//! All database queries go here. Controllers call these functions
//! and never interact with the model directly.

import Like from './likes.model.js';

export const likePost = async (userId, postId) => {
    const like = new Like({ user: userId, post: postId });
    return await like.save();
};

export const unlikePost = async (userId, postId) => {
    return await Like.findOneAndDelete({ user: userId, post: postId });
};

export const getLikesByPost = async (postId) => {
    return await Like.find({ post: postId }).populate('user', 'username');
};

export const countLikesByPost = async (postId) => {
    return await Like.countDocuments({ post: postId });
};
