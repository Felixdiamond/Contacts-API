const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");

const { getContact, createContact, updateContact, getIdContact, deleteContact } = require("../controllers/contactController");

router.use(validateToken);

router.route("/").get(getContact).post(createContact);

router.route("/:id").get(getIdContact).put(updateContact).delete(deleteContact);


module.exports = router;