import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
}

export interface IStation extends Document {
    name: string;
    location: {
        latitude: number;
        longitude: number;
    };
    status: 'Active' | 'Inactive';
    powerOutput: number;
    connectorType: string;
    user: mongoose.Types.ObjectId;
}

// ----------------------
// User Schema
// ----------------------

const UserSchema: Schema<IUser> = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export const User = mongoose.model<IUser>('User', UserSchema);

// ----------------------
// Charging Station Schema
// ----------------------

const StationSchema: Schema<IStation> = new Schema({
    name: { type: String, required: true },
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    powerOutput: { type: Number, required: true },
    connectorType: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Station = mongoose.model<IStation>('Station', StationSchema);