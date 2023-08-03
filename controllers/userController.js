const {User, Thought} = require('../models')

module.exports = {

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({_id: req.params.userId}).select('-__v');
            
            if (!user) {
                return res.status(404).json({message: "No such user with that ID."});
            }
            res.json(user);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },

    async createUser(req, res){
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err){
            res.status(500).json(err);
        }
    },


    async updateUser(req, res){
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId },
                {$set: req.body},
                {runValidators: true, new: true}
            );

            if (!user){
                return res.status(404).json({message: "No such user with this ID."})
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async removeUser(req, res){
        try {
            const user = await User.findOneAndRemove({_id: req.params.userId});

            if (!user){
                return res.status(404).json({message: 'No such user with this ID.'});
            }


        } catch (err){
            res.status(500).json(err);
        }
    },


    async addFriend(req, res){
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId },
                {$addToSet: {friends: req.params.friendId}},
                {runValidators: true, new: true}
            );

            if (!user){
                return res.status(404).json({messge: "No such user with this ID."});
            }

            res.json(user)
        } catch (err){
            res.status(500).json(err);
        }
    }, 

    async deleteFriend(req, res){
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull: {friends: req.params.friendId}},
                {runValidators: true, new: true});

            if (!user){
                return res.status(404).json({message: "No friend with that ID."});
            }
            res.json(user);
        } catch (err){
            res.status(500).json(err);
        }
    }
};