import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(3).required()
});