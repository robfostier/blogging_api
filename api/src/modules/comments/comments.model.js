//! DB model for comments
//! Defines the schema (fields, types, constraints) and exports the model.
//! This is the only place that interacts directly with the MongoDB collection.

import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    commentText: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Comment', commentSchema);