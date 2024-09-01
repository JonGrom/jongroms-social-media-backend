const { Schema, model } = require('mongoose');
const dayjs = require('dayjs')

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
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
)

function formattedDate(date){
    //2024-09-01T17:46:21.176Z normal format

}

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions ? this.reactions.length : 0
})

const Thought = model('Thought', thoughtSchema)

module.exports = { Thought }
//reaction count virtual
//settings: reactionCount and reactions array virtuals