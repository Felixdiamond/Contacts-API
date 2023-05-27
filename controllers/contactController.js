const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json({
         message: "(✿◡‿◡) Contact Retrieved Successfully! (✿◡‿◡)",
         number_of_contacts: contacts.length,
         contacts,
         port: process.env.PORT
        });
});

//@desc Create new contacts
//@route POST /api/contacts
//@access private

const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw Error("All fields are mandatory!")
    } else {
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(201).json({
         message: "(❁´◡`❁) Contact Created Successfully! (❁´◡`❁)",
         contact: contact,
         port: process.env.PORT
        });
    }
});

//@desc Get particular contact
//@route GET /api/contacts/:id
//@access private

const getIdContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact with id '" + req.params.id + "' not found!");
    } 
    res.status(200).json({
         message: `╰(*°▽°*)╯ Contact Retrieved Successfully! ${req.params.id} ╰(*°▽°*)╯`,
         contact: contact,
         port: process.env.PORT
        });
});

//@desc Updates contact
//@route PUT /api/contacts/:id
//@access private

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact with id '" + req.params.id + "' not found!");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("We both know this isn't your contact😒")
    }

    const updatedContact= await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json({
         message: `( *︾▽︾) Contact #${req.params.id} Updated Successfully! ( *︾▽︾)`,
         updated_contact: updatedContact,
         port: process.env.PORT
        });
});

//@desc Deletes contact
//@route DELETE /api/contacts/:id
//@access private

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact with id '" + req.params.id + "' not found!");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Why would you want to delete someone else's contact😒")
    }
    await contact.deleteOne({ _id: req.params.id });
    res.status(200).json({
         message: `o(*￣▽￣*)ブ Contact #${req.params.id} Deleted Successfully! o(*￣▽￣*)ブ`,
         deleted_contact: contact,
         port: process.env.PORT
        });

});

module.exports = { getContact, createContact, updateContact, getIdContact, deleteContact }