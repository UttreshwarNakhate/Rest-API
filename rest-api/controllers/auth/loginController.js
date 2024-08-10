import Joi from "joi";
import { User } from "../../models";
import bcrypt from "bcrypt";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import JwtService from "../../services/JwtService";

const loginController = {
  async login(req, res, next) {

    // validation
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}"))
        .required(),
    });

    const { error } = loginSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    // Check request body exist or not in the database
    try {
      const user = await User.findOne({ email: req.body.email });
      console.log("Database user: ", user.password)

      if (!user) {
        return next(CustomErrorHandler.wrongCredentials());
      }
      
      //   Compare the password
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return next(CustomErrorHandler.wrongCredentials());
      }

      // token generation
      const access_token = JwtService.sign({
        _id: user._id,
        role: user.role,
      });
      res.json(access_token);
    } catch (error) {
      return next(error);
    }
  },
};

export default loginController;
