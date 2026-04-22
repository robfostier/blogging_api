//! DB model and mapping function for users
//! Defines the schema (fields, types, constraints) and exports the model.
//! This is the only place that interacts directly with the MongoDB collection.

import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status:   { type: String, enum: ['active', 'deleted'], default: 'active' },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Never expose password in responses
userSchema.set('toJSON', {
    transform: (_doc, ret) => {
        delete ret.password;
        return ret;
    },
});

export default model('User', userSchema);