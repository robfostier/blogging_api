//! DB model for likes
//! Defines the schema (fields, types, constraints) and exports the model.
//! This is the only place that interacts directly with the MongoDB collection.

import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
}, { timestamps: true });

// A user can like a post only once
likeSchema.index({ user: 1, post: 1 }, { unique: true });

export default mongoose.model('Like', likeSchema);
