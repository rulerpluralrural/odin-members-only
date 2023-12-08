const Message = require('../models/message')
const User = require('../models/user')

exports.index = (req,res) => {
    res.send('Home Page')
}

exports.message_post = (req, res) => {
    res.send('Post a message')
}