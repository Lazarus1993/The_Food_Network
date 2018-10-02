const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Review model
const Review = require("../../models/Review");
// Profile model
const Profile = require("../../models/Profile");

// Validation
const validateReviewtInput = require("../../validations/review");

// @route   GET api/reviews/test
// @desc    Tests review route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Reviews Works" }));

// @route   GET api/reviews
// @desc    Get reviews
// @access  Public
router.get("/", (req, res) => {
  Review.find()
    .sort({ date: -1 })
    .then(reviews => res.json(reviews))
    .catch(err => res.status(404).json({ noreviewsfound: "No reviews found" }));
});

// @route   GET api/reviews/:id
// @desc    Get review by id
// @access  Public
router.get("/:id", (req, res) => {
  Review.findById(req.params.id)
    .then(review => res.json(review))
    .catch(err =>
      res.status(404).json({ noreviewfound: "No review found with that ID" })
    );
});

// @route   POST api/reviews
// @desc    Create review
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newReview = new Review({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newReview.save().then(review => res.json(review));
  }
);

// @route   DELETE api/reviews/:id
// @desc    Delete review
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Review.findById(req.params.id)
        .then(review => {
          // Check for review owner
          if (review.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          review.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res.status(404).json({ reviewnotfound: "No review found" })
        );
    });
  }
);

// @route   POST api/reviews/useful/:id
// @desc    Useful review
// @access  Private
router.post(
  "/useful/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Review.findById(req.params.id)
        .then(review => {
          if (
            review.usefuls.filter(
              useful => useful.user.toString() === req.user.id
            ).length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyusefuled: "User already marked useful" });
          }

          // Add user id to likes array
          review.usefuls.unshift({ user: req.user.id });

          review.save().then(review => res.json(review));
        })
        .catch(err =>
          res.status(404).json({ reviewnotfound: "No post found" })
        );
    });
  }
);

// @route   POST api/reviews/funny/:id
// @desc    funny review
// @access  Private
router.post(
  "/funny/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Review.findById(req.params.id)
        .then(review => {
          if (
            review.funnys.filter(funny => funny.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyfunnyed: "User already marked funny" });
          }

          // Add user id to likes array
          review.funnys.unshift({ user: req.user.id });

          review.save().then(review => res.json(review));
        })
        .catch(err =>
          res.status(404).json({ reviewnotfound: "No post found" })
        );
    });
  }
);

// @route   POST api/reviews/cool/:id
// @desc    cool review
// @access  Private
router.post(
  "/cool/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Review.findById(req.params.id)
        .then(review => {
          if (
            review.cools.filter(cool => cool.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadycooled: "User already marked cool" });
          }

          // Add user id to likes array
          review.cools.unshift({ user: req.user.id });

          review.save().then(review => res.json(review));
        })
        .catch(err =>
          res.status(404).json({ reviewnotfound: "No post found" })
        );
    });
  }
);

module.exports = router;
