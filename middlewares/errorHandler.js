function errorHandler(err, req, res, next) {
  console.log(err.message)
  let code = 500;
  let message = "Internal Server Error";

  if (err.message === "Username cannot be empty") {
    code = 400;
    message = "Username cannot be empty"
  } else if (err.message === "Email cannot be empty") {
    code = 400;
    message = "Email cannot be empty"
  } else if (err.message === "Password cannot be empty") {
    code = 400;
    message = "Password cannot be empty"
  } else if (err.message === "Invalid Email/Password") {
    code = 400;
    message = "Invalid Email/Password"
  } else if (err.message.includes("Validation")) {
    code = 400;
    message = err.errors[0].message;
  } else if (
    err.message === "Invalid token" ||
    err.message === "jwt must be provided" ||
    err.message === "invalid token" ||
    err.message === "jwt malformed"
  ) {
    code = 401;
    message = "Invalid token";
  } else if (err.message === "Email must be unique") {
    code = 400;
    message = "Email must be unique"
  }

  res.status(code).json({
    statusCode: code,
    message,
  });
}

module.exports = errorHandler;
