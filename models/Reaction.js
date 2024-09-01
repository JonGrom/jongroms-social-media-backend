const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        _id: {
            type: Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        text: {
            type: String,
            required: true,
            minLength: [1, 'No text provided'],
            maxLength: [280, '280 character limit exceeded! {VALUE} characters']
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
            //need getter for formatting
        },
    }
)

const Reaction = model('Reaction', reactionSchema)

module.exports = { Reaction }

