const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        text: {
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
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction'
            }
        ]
    }
)

const Thought = model('Thought', thoughtSchema)

module.exports = { Thought }
//reaction count virtual
//settings: reactionCount and reactions array virtuals