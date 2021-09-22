var userDB = require('../model/model');

// create and save new user
exports.create = (req, res) => {
    // validate request 
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty" });
        return;
    }

    // new user
    const user = new userDB({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            // res.send(data)
            res.redirect('/add-user')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error ocurred while creating the operation"
            });
        });

}

// retrieve and return all users/ retrieve and return a single user
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        userDB.findById(id)
            .then(data => {
                if (!data) {
                    res.send(400).send({ message: "Not found user with id:" + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving user with id:" + id })
            })

    } else {
        userDB.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error occured while retrieving user information" })
            })
    }
}

// update a new identified user by userID 
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    const id = req.params.id;
    userDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(400).send({ message: `Cannot update user with ${id}. Maybe user not found.` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error update user information" })
        })
}

// delete a user with specified user id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    userDB.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(400).send({ message: `Cannot delete with ${id}. Maybe id is wrong.` })
            } else {
                res.send({
                    message: "User was deleted sucessfully"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete user with id=" + id
            });
        });
}