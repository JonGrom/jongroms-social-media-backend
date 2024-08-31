const { Schema, Types } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: [1, 'No text provided'],
            maxLength: [280, '280 character limit exceeded! {VALUE} characters']
        },
        createdAt: {
            type: Date,
            default: Date.now
            //need getter for formatting
        },
        username: {
            type: String,
            required: true
        },
        reactions: [
            {
                type: Types.ObjectId,
                ref: 'Reaction'
            }
        ]
    }
)

//reaction count virtual
//settings: reactionCount and reactions array virtuals