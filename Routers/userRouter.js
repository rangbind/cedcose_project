const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController');
const authorization = require('../Controllers/authController');
const userValidation = require('../Validations/userValidations');

router.get('/user-grid', authorization.authenticate, async (req, res) => {
    try {
        const userDetails = await userController.userGrid();
        res.send({
            message: "success",
            data: userDetails,
        });        
    } catch (error) {
        res.status(500).send({
            message: "failed",
            data: error,
        });
    }
});

router.post('/user-create', async (req, res) => {
    try {
        const validationResponse = await userValidation.create(req.body);
        if (validationResponse !== null) {
            res.status(422).send({
                message: "failed",
                data: validationResponse,
            });
        } else {
            const userDetails = await userController.userCreate(req.body);
            res.status(201).send({
                message: "success",
                data: userDetails,
            });        
        }
    } catch (error) {
        res.status(500).send({
            message: "failed",
            data: error,
        });
    }
});

router.post('/user-login', async (req, res) => {
    try {
        const validationResponse = await userValidation.login(req.body);
        if (validationResponse !== null) {
            res.status(422).send({
                message: "failed",
                data: validationResponse,
            });
        } else {
            const userDetails = await userController.userLogin(req.body);
            res.send({
                message: "success",
                data: userDetails,
            });        
        }
    } catch (error) {
        res.status(500).send({
            message: "failed",
            data: error,
        });
    }
});

module.exports = router;