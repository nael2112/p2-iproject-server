const { verify } = require("jsonwebtoken");
const {User} = require("../models")


async function authentication (req, res, next) {
  try {
    const { access_token } = req.headers;
    const payload = verify(access_token, "secret");

    const user = await User.findByPk(payload.id);

    if (!user) {
      throw new Error("Invalid token");
    }

    req.additionalData = {
      id: user.id,
      email: user.email,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication