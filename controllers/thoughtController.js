const { Thought } = require('../models/Thought')
const { Reaction } = require('../models/Reaction')
const { User } = require('../models/User') //?

module.exports = {
    //get all thoughts
    async getThoughts(req, res) {
        try {
          const thoughts = await Thought.find().populate('reactions');
          res.json(thoughts);
        } catch (err) {
          res.status(500).json(err);
        }
    },
    //get a thought
    async getSingleThought(req, res){
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId}).populate('reactions')
            if(!thought){
                return res.status(404).json({ message: 'thought not found'});
            }
            res.json(thought);
        }catch (err) {
            res.status(500).json(err);
        }
    },
    //create thought
    async createThought(req, res) {
        const user = await User.findOne({username: req.body.username})
        console.log(user)
        try{
          const thought = await Thought.create(req.body);
          res.json(thought);
          const user = await User.findOneAndUpdate(
            { username: req.body.username },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
          )
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
    },
    //update a thought
    async updateThought(req,res){
        try {
            const thought = await Thought.findOneAndUpdate(
              { _id: req.params.thoughtId },
              { $set: req.body },
              { runValidators: true, new: true }
            );
      
            if (!thought) {
              res.status(404).json({ message: 'No thought with this id!' });
            }
      
            res.json(thought);
          } catch (err) {
            res.status(500).json(err);
          }
    },
    //delete a thought
    async deleteThought(req, res) {
        try {
          const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
    
          if (!thought) {
            res.status(404).json({ message: 'thought not found' });
          }
    
          await Reaction.deleteMany({ _id: { $in: thought.thoughts } });
          res.json({ message: 'thought and reactions deleted!' });

          const user = await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          )
        } catch (err) {
          res.status(500).json(err);
        }
    },
    

}
