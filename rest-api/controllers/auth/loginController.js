import Joi from "joi";
import { User } from "../../models";
import bcrypt from "bcrypt";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import JwtService from "../../services/JwtService";
import { REFRESH_SECRET } from "../../config";
import { RefreshToken } from "../../models";

const loginController = {
  // Function for logint the user
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
      console.log("Database user: ", user.password);

      if (!user) {
        return next(CustomErrorHandler.wrongCredentials());
      }

      //   Compare the password
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return next(CustomErrorHandler.wrongCredentials());
      }

      // token generation
      const access_token = JwtService.sign({ _id: user._id, role: user.role });
      const refresh_token = JwtService.sign(
        { _id: user._id, role: user.role },
        "1y",
        REFRESH_SECRET
      );

      // database whitelist
      await RefreshToken.create({ token: refresh_token });

      res.json({ access_token: access_token, refresh_token: refresh_token });
    } catch (error) {
      return next(error);
    }
  },

  // Function for logout the user
  async logout(req, res, next) {
    // Validate request
    const refreshSchema = Joi.object({
      refresh_token: Joi.string().required(),
    });

    const { error } = refreshSchema.validate(req.body);

    if (error) {
      return next(error);
    }
    try {
      await RefreshToken.deleteOne({ token: req.body.refresh_token });
    } catch (error) {
      return next(new Error("Something wrong in the database"));
    }
    res.json({ staus: 1 });
  },
};

export default loginController;
