const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Offer = require('../models/Studentoffer');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Offers using: GET "/api/studentoffers/getuser". Login required
router.get('/fetchallstudentoffers', fetchuser, async (req, res) => {
    try {
        const offers = await Offer.find({ user: req.user.id });
        res.json(offers)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Offer using: POST "/api/studentoffers/addstudentoffer". Login required
router.post('/addstudentoffer', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            let success =false;
            let user = await Offer.findOne({ user: req.user.id,title,description,tag});
            if (user) {
                return res.status(400).json({ success, error: "Already Applied for this offer" })
            }
            success=true;
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


module.exports = router