import Joi from "joi";

const registerController = {
  register(req, res, next) {
    //CheckList for register steps
    //     [1] Validate the request

    const registerSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}"))
        .required(),
    });

    const { error } = registerSchema.validate(req.body);

    if (error) {
      throw error;
    }

    //     [2] authorise the  request
    //     [3] check if user is in the database already
    //     [4] prepare model
    //     [5] store in database
    //     [6] generate JWT token
    //     [7] send response

    // Logic for registration process
    res.json({ msg: "Hello from register" });
  },
};

export default registerController;
