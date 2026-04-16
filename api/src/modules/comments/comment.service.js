import Comment from './comment.model.js';

export const createComment = async (commentData) => {
    const newComment = new Comment(commentData);
    return await newComment.save();
};

export const updateComment = async (id, updateData) => {
    return await Comment.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

export const deleteComment = async (id) => {
    return await Comment.findByIdAndDelete(id);
};

export const getCommentsByPostId = async (postId) => {
    return await Comment.find({ post: postId }).sort({ createdAt: -1 }).populate('author', 'username email');;
};