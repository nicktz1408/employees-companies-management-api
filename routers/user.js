const login = require("./../controllers/user/login");
const register = require("./../controllers/user/register");
const forgotRequest = require("./../controllers/user/forgot-password-request");
const forgotRetrieve = require("./../controllers/user/forgot-password-retrieve");

const bcrypt = require("./../utilities/bcrypt");

const Router = require("express").Router();

Router.post("/login", login.validate, login.authenticate, login.issueToken);
Router.post("/register", register.validate, register.checkUserExistance, register.hashPassword, register.addUserToDB);

Router.get("/forgot/request", forgotRequest.validate, forgotRequest.getUserId, forgotRequest.generateToken, forgotRequest.hashToken, forgotRequest.addRecordToDB /* send e-mail with token! */);
Router.post("/forgot/retrieve", forgotRetrieve.validate, forgotRetrieve.getRecordFromDB, forgotRetrieve.validateToken, forgotRetrieve.hashPassword, forgotRetrieve.updatePassword, forgotRetrieve.removeRecordFromDB);

module.exports = Router;