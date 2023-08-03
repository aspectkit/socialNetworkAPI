const {Schema, model} = require('mongoose');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new Schema(
    {
        username: {require: true, type: String, unique: true, trim: true},
        email: {require: true, type: String, unique: true, validate: [validateEmail, 'Please fill a valid email address'], match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
        thoughts: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'thoughts'
                }
            ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'friends'
            }
        ]
        
},{
    toJSON: {
        virtuals: true
    },
    id: false,
});

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});


const User = model('user', userSchema);


module.exports = User;