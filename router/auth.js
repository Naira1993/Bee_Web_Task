const  { Router } = require('express')

const controller = require('../controller/auth')
const upload = require('../middleware/upload')

const router = Router();

router.post('/login',  controller.login);
router.post('/signup',  upload.single('image'), controller.signup)
router.get('/:email',   controller.getUserByEmail);
router.patch('/:email', upload.single('image'),  controller.update);

module.exports = router