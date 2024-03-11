const { raw } = require('mysql2');
const   userController= require('../models/user');

const allUsers = async (req,res) =>{
    const users = await userController.findAll({
        raw:true
    }).catch(err => console.log(err));
    await res.render('home',{users})
}
const useForm = async (req,res) =>{
    await res.render('createUser')
}
const saveUser = async (req,res) =>{
    const {name,email,phone} = req.body
    await userController.create({
    name,email,phone})
    .catch(err => console.log(err));
    console.log(userController);
    res.redirect('/')

    await res.render('createUser')
}

const editUser = async (req, res) => {
    const { id } = req.params;
    
    try {
        const user = await userController.findOne({
            where: { id: id },
            raw: true
        });

        if (!user) {
            // Handle case where user with the given id is not found
            return res.status(404).send('User not found');
        }

        res.render('edit', { user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const selector = {
            where: { id: id }
        };

        await userController.update(data, selector);

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
    const viewUser = async (req, res) => {
        const { id } = req.params;
        const user = await userController.findOne({
            where: { id: id },
            raw: true
        });
        if(!user){
            return res.status(404).send('User not found');
        }
        
        res.render('user', { user });
    }
    
    const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userController.findOne({
            where: { id: id }
        });

        if (!user) {
            // Handle case where user with the given id is not found
            return res.status(404).send('User not found');
        }

        await user.destroy();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    allUsers,useForm,saveUser,editUser,updateUser,viewUser,deleteUser
}