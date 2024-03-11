const express = require('express');

const router = express.Router()
const {allUsers, useForm, saveUser, editUser ,updateUser, viewUser, deleteUser} = require('../Controller/user')


router.get('/',allUsers)
router.get('/createUser',useForm)
router.post('/createUser',saveUser)
router.get('/edit/:id', editUser)
router.post('/update/:id',updateUser)
router.get('/user/:id',viewUser)
router.get('/delete/:id',deleteUser)

module.exports = router