const { User } = require('../models/User')
const { Thought } = require('../models/Thought' )
module.exports = {
    //get all users
    async getUsers(req, res) {
        try {
          const users = await User.find().populate('thoughts');
          res.json(users);
        } catch (err) {
          console.log(err)
          res.status(500).json(err);
        }
    },
    //get a user
    async getSingleUser(req, res){
        try {
            const user = await User.findOne({_id: req.params.userId}).populate('thoughts')
            if(!user){
                return res.status(404).json({ message: 'User not found'});
            }
            res.json(user);
        }catch (err) {
            console.log(err)
            res.status(500).json(err);

        }
    },
    //create user
    async createUser(req, res) {
        try {
          const user = await User.create(req.body);
          res.json(user);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
    },
    async updateUser(req,res){
        try {
            const user = await User.findOneAndUpdate(
              { _id: req.params.userId },
              { $set: req.body },
              { runValidators: true, new: true }
            );
      
            if (!user) {
              res.status(404).json({ message: 'No user with this id!' });
            }
      
            res.json(user);
          } catch (err) {
            res.status(500).json(err);
          }
    },
    async deleteUser(req, res) {
        try {
          const user = await User.findOneAndDelete({ _id: req.params.userId });
    
          if (!user) {
            res.status(404).json({ message: 'User not found' });
          }
    
          await Thought.deleteMany({ _id: { $in: user.thoughts } });
          res.json({ message: 'user and thoughts deleted!' });
        } catch (err) {
          res.status(500).json(err);
        }
    },
}