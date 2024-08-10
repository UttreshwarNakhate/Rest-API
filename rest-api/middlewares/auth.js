// import CustomErrorHandler from "../services/CustomErrorHandler";
// import JwtService from "../services/JwtService";

// const auth = async (req, res, next) => {
//   let authHeader = req.headers.authorization;
//   console.log("authHeader: ", authHeader);

//   if (!authHeader) {
//     return next(CustomErrorHandler.unAuthorized());
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const { _id, role } = await JwtService.verify(token);
//     console.log("Id and role: "._id, role);
//     const user = {
//       _id,
//       role,
//     };
//     req.user = user;

//     console.log("request user: ", user);
//     next();
//   } catch (error) {
//     console.log("error: ", error)
//     return next(CustomErrorHandler.unAuthorized());
//   }
// };

// export default auth;
import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtService from "../services/JwtService";

const auth = async (req, res, next) => {
  //   const authHeader = req.headers.authorization;
  const authHeader = req.headers["authorization"];
  console.log("authHeader:", authHeader);

  if (!authHeader) {
    return next(CustomErrorHandler.unAuthorized("No token provided"));
  }

  const token = authHeader.split(" ")[1];
  console.log("Token: ", token);

    try {
  const { _id, role } = JwtService.verify(token);
  console.log("Id and role:", _id, role);

  const user = {
    _id,
    role,
  };

  req.user = user;

  console.log("Request user:", req.user);
  next();
    } catch (error) {
      console.error("JWT verification error:", error);

      if (error) {
        return next(CustomErrorHandler.unAuthorized());
      }

      return next(CustomErrorHandler.unAuthorized());
    }
};

export default auth;
