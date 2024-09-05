import Joi from "joi";
import CustomErrorHandler from "../CustomErrorHandler";
import { User } from "../models";

const registerController = {
  // function to write the functionality of validatw the payload and store it in the database
  async register(req, res, next) {
    //CheckList for register steps
    //     [2] authorise the  request
    //     [3] check if user is in the database already
    //     [4] prepare model
    //     [5] store in database
    //     [6] generate JWT token
    //     [7] send response

    //     [1] Validate the request
    const registerSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      repeat_password: Joi.ref("password"),
    }).with("password", "repeat_password");

    // Validate request body and send response
    const { error } = registerSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    // Check if user is in the database already

    try {
      const exist = await User.exist({ email: req.body.email });

      if (exist) {
        return next(
          CustomErrorHandler.alreadyExist(
            "User with this email is already exist!"
          )
        );
      }
    } catch (error) {
      return next(error);
    }

    // Logic for registration process
    res.json({ msg: "Hello from register" });
  },
};

export default registerController;
