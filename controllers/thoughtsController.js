const {Thought, User} = require('../models');
const thoughts = require('../models/thought');

module.exports = {

    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res){
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtsId}).select('-__v');

            if (!thought){
                 return res.status(404).json({message: "No thought found with this id"});
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },

    async createThought(req, res){
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                {username: req.body.username},
                {$push: {thoughts: thought._id}},
                {runValidators: true, new: true});

            if (!user){
                return res.status(404).json({message: "no user with this id :("})
            }

            res.json(thought);
        } catch (err){
            return res.status(500).json({message: err.message});
        }
    },

    async updateThought(req, res){
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtsId },
                {$set: req.body},
                {runValidators: true, new: true}
            );

            if (!thought){
                return res.status(404).json({message: "No thought found with this id"})
            }

            res.json(thought)
        } catch (err){
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res){
        try {
            const thought = await Thought.findOneAndRemove({_id: req.params.thoughtId});

            if (!thought) {
                return res.status(404).json({message: "No thought found with this id"});
            }
            const user = await User.findOneAndUpdate(
                {thoughts: req.params.thoughtId},
                {$pull: {thoughts: req.params.thoughtId}},
                {runValidators: true, new: true});

            if (!user){
                return res.status(404).json({message: "No user found"});
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },


    async createReaction(req, res){
        try {
            // const reaction = await .create(req.body);
            console.log(req.params);
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtsId},
                {$addToSet: {reactions: req.body}},
                {runValidators: true, new: true}
            );

            if (!thought){
                return res.status(404).json({message: "could not create reaction"});
            }

            res.json(thought);
        } catch (err){
            res.status(500).json(err);
        }
    },


    async deleteReaction(req, res){
        try {
            const reaction = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions: {reactionsId: req.body.reactionsId}}},
                {runValidators: true, new: true}
            );

            if (!reaction) {
                return res.status(404).json({ message: 'No reaction with this id!' });
            }

            res.json({message: "reaction deleted!"});
        } catch (err){
            res.status(500).json(err);
        }
    }
}