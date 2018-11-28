const Router = require("express").Router();

const requests = require("./../controllers/requests");

/* Apply required authentication first! and encryption of employeeId */

Router.get("/:employeeId/employee", requests.getEmployees);
Router.get("/:employeeId/company", requests.getCompanies);

Router.post("/:employeeId/accept", requests.validateRequestAction, requests.checkExistanceRequestAction, requests.addContact, requests.Delete)
//Router.post("/:employeeId/accept/companies")		USE EMPLOYEE_ID instead!

Router.post("/:employeeId/decline", requests.validateRequestAction, requests.checkExistanceRequestAction, requests.Delete)
//Router.post("/:employeeId/decline/companies")		USE EMPLOYEE_ID instead!

Router.post("/:iniatorId/iniate", requests.validateIniate, requests.checkExistanceIniate, requests.checkExistanceContact, requests.post)
//Router.post("/:employeeId/initate/companies")		USE THE EMPLOYEE_ID PROVIDED AT GET /:employeeId/companies instead!

module.exports = Router;