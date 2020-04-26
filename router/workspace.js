const { Router } = require('express')
const controller = require('../controller/workspace')
const passport = require('passport')

const router = Router()

router.post('/', passport.authenticate('jwt', {session: false}), controller.create)
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAllByUser)
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById)
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.update)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.delete)

module.exports = router