const {Schema, model} = require('mongoose');
const reactionSchema = require('./reaction');

function timeSince(date) {
   return  new Date(date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 

}

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,

        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => timeSince(date)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [
            reactionSchema
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const thoughts = model('thoughts', thoughtSchema);

module.exports = thoughts;