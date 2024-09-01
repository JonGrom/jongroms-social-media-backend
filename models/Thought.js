const { Schema, model, Types } = require('mongoose');
const dayjs = require('dayjs')

const reactionSchema = new Schema(
    {
        _id: {
            type: Types.ObjectId,
            default: Types.ObjectId
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

const thoughtSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            minLength: [1, 'No text provided'],
            maxLength: [280, '280 character limit exceeded! {VALUE} characters']
        },
        createdAt: {
            type: String,
            default: dayjs()
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
)

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions ? this.reactions.length : 0
})

const Thought = model('Thought', thoughtSchema)

module.exports = { Thought }