import Joi from "joi";
import { User, RefreshToken } from "../../models";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import JwtService from "../../services/JwtService";
import { REFRESH_SECRET } from "../../config";

const refreshController = {
  async refresh(req, res, next) {
    // Validate request
    const refreshSchema = Joi.object({
      refresh_token: Joi.string().required(),
    });

    const { error } = refreshSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    // check refresh token in database
    let refreshToken;
    try {
      refreshToken = await RefreshToken.findOne({
        token: req.body.refresh_token,
      });

      console.log("refreshToken: ", refreshToken);

      if (!refreshToken) {
        return next(CustomErrorHandler.unAuthorized("Invalid refresh token"));
      }

      //   verify token
      let userId;
      try {
        const { _id } = await JwtService.verify(
          refreshToken.token,
          fdsfrfgfdfdg
        );
        console.log("id", _id);

        userId = _id;
      } catch (error) {
        return next(CustomErrorHandler.unAuthorized("Invalid refresh token"));
      }

      //   check user exist or not
      const user = await User.findOne({ _id: userId });
      console.log("user: ", user);
      if (!user) {
        return next(CustomErrorHandler.unAuthorized("No user found!"));
      }

      //   generate new tokens
      const access_token = JwtService.sign({ _id: user._id, role: user.role });
      const refresh_token = JwtService.sign(
        { _id: user._id, role: user.role },
        "1y",
        fdsfrfgfdfdg
      );

      // Database whitelist
      const stored = await RefreshToken.create({ token: refresh_token });
      console.log("stored: ", stored);
      res.json({ access_token: access_token, refresh_token: refresh_token });
    } catch (error) {
      console.log("Error: ", error);
      return next(new Error("Something went wrong!", error.message));
    }
  },
};

export default refreshController;
