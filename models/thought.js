const {Schema, model} = require('mongoose');

function timeSince(date) {
   return  new Date(date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 

}

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            require: true,
            minlength: 1,
            maxlength: 280,

        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => timeSince(date)
        }
    }
)