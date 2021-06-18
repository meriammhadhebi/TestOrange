const express = require('express');
const UserController = require('../Controllers/user');



const router = express.Router();

router.route('/SignUp').post(UserController.signup )
router.route('/SignIn').post(UserController.signin )
router.route('/users').get(UserController.getUsers )
router.route('/delete/:id').patch(UserController.archive )
router.route('/:id').get(UserController.getUser )
                    .patch(UserController.updateUser)

module.exports = router; 