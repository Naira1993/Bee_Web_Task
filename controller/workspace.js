const Workspace = require('../models/Workspace')
const errorHandler = require('../utils/errorHandler')


module.exports.create = async (req, res) => {

    try {
        const users = req.body.users
        users.push(req.user.email)
       let id;

        await Workspace.create({
            name: req.body.name,
            displayName: req.body.displayName,
            user_email: req.user.email,
            ownerId: req.user.id,
            users: users
        }).then(workspace => {
            id = workspace.id
            console.log(workspace); 
        }).catch(error => {
            res.status(304).json({
                message: error.message
            })

        })
            res.status(201).json({
                id
            })

    } catch (error) {
        errorHandler(res, error)
    }

}

module.exports.getAllByUser = async (req, res) => {
    try {
        const workspaces = await Workspace.findAll()
        res.status(201).json({
            workspaces
        })
            .catch(error => {
                console.log(error);
            })
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.getById = async (req, res) => {

    try {
        let workspace = await Workspace.findOne({
            where: {
                id: req.params.id
            }
        })
            .catch(error => {
                console.log(error);

            })

        res.status(201).json({
            workspace
        })
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.update = async (req, res) => {
    try {

       const workspace = await Workspace.findOne({
            where: {
                id: req.params.id
            }
        }).then(workspace => {
            let users = workspace.users;
            users = users.concat(req.body)
            workspace.update({
                users
            })
        }).catch(error => {
            errorHandler(res, error)
        })
  
        res.status(200).json({
            message: "Updated!"
        })
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.delete = async (req, res) => {

    try {

        await Workspace.destroy({
            where: {
                id: req.params.id
            }
        }).catch(error => {
            errorHandler(res, error)
        })


    } catch (error) {
        errorHandler(res, error)
    }
}