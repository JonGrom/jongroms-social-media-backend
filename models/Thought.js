const { Schema, model, Types } = require('mongoose');
const dayjs = require('dayjs')

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
            default: new Date,
            get: getDate
        },
    },
    {
        toJSON: {
            getters: true
        }
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
            type: Date,
            default: new Date,
            get: getDate
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
            getters: true
        },
        id: false
    }
)

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions ? this.reactions.length : 0
})

function getDate(date){
    const formattedDate = dayjs(date).format('MMM/D/YYYY h:ma')
    return formattedDate
}

const Thought = model('Thought', thoughtSchema)

module.exports = { Thought }