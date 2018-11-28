const Router = require("express").Router();

const contacts = require("./../controllers/contacts");

/* Apply required authentication first! and encryption of employeeId */

Router.get("/:employeeId/employee", contacts.getEmployees);
Router.get("/:employeeId/company", contacts.getCompanies);

Router.get("/:employeeId/employee/search", contacts.validateSearch, contacts.searchEmployees)
Router.get("/:employeeId/employee/autocomplete", contacts.validateAutocomplete, contacts.autocompleteEmployees)

Router.get("/:employeeId/company/search", contacts.validateSearch, contacts.searchCompanies);
Router.get("/:employeeId/company/autocomplete", contacts.validateAutocomplete, contacts.autocompleteCompanies);

module.exports = Router;