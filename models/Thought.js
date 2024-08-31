const { Schema, Types } = require('mongoose');

const thoughtSchema = new Schema()

//thoughtText: string, required, 1-280 characters
//createdAt: date, default current timestamp, getter method to format on query??
//username: string, required
//reactions: array of nested documents from reactionschema

//settings: reactionCount and reactions array virtuals