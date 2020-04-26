const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async (req, res) => {
    try {
        const candidate = await User.findOne({
            where: {
                email: req.body.email
            }
        })
            .catch(error => {
                errorHandler(res, error)
            });
        if (candidate) {
            const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
            if (passwordResult) {
                const token = jwt.sign({
                    email: candidate.email,
                    userId: candidate.id
                }, 'dev-jwt', { expiresIn: 60 * 60 * 100});


                res.status(201).json({
                    token: `Bearer ${token}`
                })
            } else {
                res.status(404).json({
                    message: "The password is incorrect!"
                })
            }
        } else {
            res.status(404).json({
                message: "This email doesn't exist!"
            })
        }
    } catch (error) {
        errorHandler(res, error)
    }

}

module.exports.signup = async (req, res) => {
    try {
        const candidate = await User.findOne({
            where: {
                email: req.body.email
            }
        })
            .catch(error => {
                console.log(error);

            })
        if (candidate) {
            res.status(404).json({
                message: "This email already exists. Please try another email!"
            })
        } else {
            const password = req.body.password;
            const salt = bcrypt.genSaltSync(10);

            const user = await User.create({
                fullName: req.body.fullName,
                password: bcrypt.hashSync(password, salt),
                email: req.body.email,
                image: req.file ? req.file.path : '/images/smile.jpg'
            })
                .catch(error => {
                    console.log(error);

                })
            const token = jwt.sign({
                email: user.email,
                userId: user.id
            }, 'dev-jwt', { expiresIn: 60 * 60 * 100});

            res.status(201).json({
                token: `Bearer ${token}`
            })
        }
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.getUserByEmail = async (req, res) => {
    const candidate = await User.findOne({
        where: {
            email: req.params.email
        }
    })
        .catch(error => {
            console.log(error);
        })

    candidate.password.delete
    res.status(201).json({
        user: candidate
    })
}

module.exports.update = async (req, res) => {

    console.log(req.params.email);

    const userItem = await User.findOne({
        where: {
            email: req.params.email
        }
    }).then(user => {
        user.update({
            fullName: req.body.fullName,
            image: req.file ? req.file.path : user.image
        })
    }).catch(e => {
        console.log(e);
    })


    await User.update({
        where: {
            email: req.params.email
        }
    }, {
        fullName: req.body.fullName,
        image: req.file ? req.file.path : '/images/smile.jpg'
    })
}