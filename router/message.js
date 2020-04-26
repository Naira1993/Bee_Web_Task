const { Router } = require('express')
const controller = require('../controller/message')
const passport = require('passport')

const router = Router()

router.post('/', passport.authenticate('jwt', {session: false}), controller.create)
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getAllByWorkspaceId)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.delete)

module.exports = router