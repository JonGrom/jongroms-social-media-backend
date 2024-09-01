const { User } = require('../models/User')
const { Thought } = require('../models/Thought' )
module.exports = {
    //get all users
    async getUsers(req, res) {
        try {
          const users = await User.find().populate('thoughts', 'text').populate('friends', 'username');
          res.json(users);
        } catch (err) {
          console.log(err)
          res.status(500).json(err);
        }
    },
    //get a user
    async getSingleUser(req, res){
        try {
            const user = await User.findOne({_id: req.params.userId}).populate('thoughts', 'text').populate('friends', 'username')
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
        } //might need to update to delete reactions as well? And remove from "friends" of other users
        
    },
    //add a friend
    async addFriend(req, res) {
      // body = {username,}
      try{
        const friend = await User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { friends: req.params.userId } },
          { new: true }
        )
        console.log(friend)
        await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: friend._id}},
          { new: true }
        )
        res.json( {message: 'friend added'})
      } catch(err){
        console.log(err)
        res.status(500).json(err);
      }
    },
    //remove friend
    async removeFriend(req, res){
      try{
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId}},
          { new: true }
        )
        const friend = await User.findOneAndUpdate(
          { _id: req.params.friendId },
          { $pull: { friends: req.params.userId }},
          { new: true }
        )
        res.json(`${user.username} and ${friend.username} are no longer friends.`)
      } catch(err){
        res.status(500).json(err);
      }
    }
}