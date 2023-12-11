const {Manager, Visitor } = require('../models/userModel');

async function getAllUsers(req, res) {
    Manager.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json(`Error: ${err}`));
}

async function getUserById(req, res) {
    Manager.findById(req.params.id)
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(`Error: ${err}`));
}

async function createUser(req, res) {
    const newUser = new Manager(req.body);
    newUser
        .save()
        .then(() => res.json('User added!'))
        .catch((err) => res.status(400).json(`Error: ${err}`));
}

async function deleteUser(req, res) {
    Manager.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch((err) => res.status(400).json(`Error: ${err}`));
}

async function updateUser(req, res) {
    Manager.findById(req.params.id)
        .then((user) => {
            user.name = req.body.name;
            user.password = req.body.password;
            user.email = req.body.email;
            user.userType = req.body.userType;
            user.profilePicture = req.body.profilePicture;
            user
                .save()
                .then(() => res.json('User updated!'))
                .catch((err) => res.status(400).json(`Error: ${err}`));
        })
        .catch((err) => res.status(400).json(`Error: ${err}`));
}

module.exports = {getAllUsers, getUserById, createUser, deleteUser, updateUser};


