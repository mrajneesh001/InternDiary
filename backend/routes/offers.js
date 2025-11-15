const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Offer = require('../models/Offer');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Offers using: GET "/api/offers/getuser". Login required
router.get('/fetchalloffers', fetchuser, async (req, res) => {
    try {
        const offers = await Offer.find();
        res.json(offers)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Get all offers of the alum using GET 
router.get('/fetchallalumoffers', fetchuser, async (req, res) => {
    try {
        const offers = await Offer.find({ user: req.user.id });
        res.json(offers)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Offer using: POST "/api/offers/addoffer". Login required
router.post('/addoffer', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const offer = new Offer({
                title, description, tag, user: req.user.id
            })
            const savedOffer = await offer.save()

            res.json(savedOffer)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

// ROUTE 3: Update an existing Offer using: PUT "/api/offers/updateoffer". Login required
router.put('/updateoffer/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the offer to be updated and update it
        let offer = await Offer.findById(req.params.id);
        if (!offer) { return res.status(404).send("Not Found") }

        if (offer.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        offer = await Offer.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ offer });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete an existing Offer using: DELETE "/api/offers/deleteoffer". Login required
router.delete('/deleteoffer/:id', fetchuser, async (req, res) => {
    try {
        // Find the offer to be delete and delete it
        let offer = await Offer.findById(req.params.id);
        if (!offer) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Offer
        if (offer.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        offer = await Offer.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Offer has been deleted", offer: offer });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 5: Add student id who has applied to an existing Offer using: PUT "/api/offers/addsttudent". Login required

router.put('/addstudent/:id', fetchuser, async (req, res) => {
    const { studentid, name, email, profilepic, resume } = req.body;
    try {

        // Find the offer to be updated and update it
        let offer = await Offer.findById(req.params.id);
        if (!offer) { return res.status(404).send("Not Found") }

        // Check whether the user with this email exists already
        let success = false;
        let selectedOffer = await Offer.findById(req.params.id);
        let student = selectedOffer.studentsenrolled;

        for (let i = 0; i < student.length; i++) {
            if (student[i].userid === studentid) success = true;
        }

        if (success) {
            return res.status(400).json({ success, error: "Alredy applied!" })
        }

        success = true;
        offer = await Offer.findByIdAndUpdate(req.params.id, { $push: { studentsenrolled: { userid: studentid, name: name, email: email, profilepic: profilepic, resume: resume } } }, { new: true })
        res.json({ success, offer });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(JSON.stringify("Internal Server Error"));
    }
})


module.exports = router