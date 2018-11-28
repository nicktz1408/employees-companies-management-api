const Router = require("express").Router();

const views = require("./../controllers/views");

/* AUTHENTICATION - GET FROM JWT TOKEN - only for employees */

Router.get("/employee", views.validateGet, views.getEmployee);
Router.get("/company", views.validateGet, views.getCompany);

module.exports = Router;