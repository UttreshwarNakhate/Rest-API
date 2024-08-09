import Joi from "joi";
import { User } from "../../models";
import bcrypt from "bcrypt";
import JwtService from "../../services/JwtService";

const registerController = {
  async register(req, res, next) {
    //CheckList for register steps
    //     [1] Validate the request

    const registerSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}"))
        .required(),
      repeat_password: Joi.ref("password"),
    });

    // Validate the requet body
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    // check if user is in the database already
    try {
      const exist = await User.exists({ email: req.body.email });
      if (exist) {
        return next(
          CustomErrorHandler.alreadyExist("This email is already taken.")
        );
      }
    } catch (err) {
      return next(err);
    }

    // Destructure the data from req.body
    const { name, email, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password: ", hashedPassword);

    // Prepare the model
    const user = {
      name,
      email,
      password: hashedPassword,
    };

    // Store the data iun database
    let access_token;
    try {
      const result = await User.save({user});
      console.log("result", result);

      // Token
      access_token = JwtService.sign({ _id: result._id, role: result.role });
    } catch (error) {
      return next(error);
    }

    //     [2] authorise the  request
    //     [3] check if user is in the database already
    //     [4] prepare model
    //     [5] store in database
    //     [6] generate JWT token
    //     [7] send response

    // Logic for registration process
    res.json({ access_token: access_token });
  },
};

export default registerController;
