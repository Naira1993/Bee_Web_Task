const Message = require('../models/Message')
const errorHandler = require('../utils/errorHandler')


module.exports.create = async (req, res) => {

    try {
        await Message.create({
            text: req.body.text,
            user_name: req.body.user_name,
            user_id: req.user.id,
            workspace_id: req.body.workspace_id
        })
            .catch(error => {
                errorHandler(res, error)
            })

    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.getAllByWorkspaceId = async (req, res) => {
    try {
        console.log(req.params.id);
        
        const messages = await Message.findAll({
            where: {
                workspace_id: req.params.id
            }
        }).catch(error => {
            errorHandler(res, error)
        })

        res.status(201).json({
            messages
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