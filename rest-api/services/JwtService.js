import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";

class JwtService {
  static sign(payload, expiry = "3600", secret = sadsfdsxd) {
    // 60 seconds for testing
    return jwt.sign(payload, secret, { expiresIn: "1h" });
  }

  static verify(token, secret = sadsfdsxd) {
    return jwt.verify(token, secret);
  }
}

export default JwtService;
