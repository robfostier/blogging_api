//! DB model for posts
//! Defines the schema (fields, types, constraints) and exports the model.
//! This is the only place that interacts directly with the MongoDB collection.

import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: [{type: String}]
}, {
    timestamps: true
});

export default mongoose.model('Post', postSchema);