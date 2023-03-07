const Joi = require('joi');

const create = async (data) => {
    const schema = Joi.object().keys({
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        confirmPassword: Joi.string().equal(Joi.ref('password')).required(),
    });

    const validationResponse = await schema.validateAsync(data, {abortEarly: false});
    if (validationResponse.error) {
        const errorDetils = [];
        for(details of validationResponse.error.details){
            errorDetils.push({
                key: details.path[0],
                message: details.message
            });
        }
    } else {
        return null;
    }    
};

const login = async (data) => {
    const schema = Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
    });

    const validationResponse = await schema.validateAsync(data, {abortEarly: false});
    if (validationResponse.error) {
        return validationResponse.error;
    } else {
        return null;
    }    
};


module.exports = {
    create,
    login,
}