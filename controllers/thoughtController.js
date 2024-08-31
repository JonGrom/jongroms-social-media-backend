const { User, Thought, Reaction } = require('../models')

module.exports = {
    //get all thoughts
    async getThoughts(req, res) {
        try {
          const thoughts = await Thought.find().populate('thoughts');
          res.json(thoughts);
        } catch (err) {
          res.status(500).json(err);
        }
    },
    //get a thought
    async getSingleThought(req, res){
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId}).populate('thoughts')
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
        try {
          const thought = await Thought.create(req.body);
          res.json(thought);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
    },
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
    async deleteThought(req, res) {
        try {
          const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
    
          if (!thought) {
            res.status(404).json({ message: 'thought not found' });
          }
    
          await Reaction.deleteMany({ _id: { $in: thought.thoughts } });
          res.json({ message: 'thought and thoughts deleted!' });
        } catch (err) {
          res.status(500).json(err);
        }
    },
}
