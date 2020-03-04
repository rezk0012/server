const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", (req, res) => {
    Post.find()
        .then(rec => {
            res.status(200).json(rec);
        })
        .catch(err => {
            res.status(400).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    console.log(req.file)
    const post = new Post({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        body: req.body.body,
        date: Date.now(),
    });

    post.save().then(rec => {
            res.status(200).json({
                message: 'Post Saved successfully'
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
})

router.put("/:id/like", (req, res) => {
    Post.findById({ _id: req.params.id })
        .then(rec => {
            if (!rec) {
                res.status(404).json({
                    message: "Post Not Found"
                });
            }
            rec.likes = rec.likes + 1;
            rec.save();
            res.status(200).json({
                message: "Post Liked"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.put("/:id/dislike", (req, res) => {
    Post.findById({ _id: req.params.id })
        .then(rec => {
            if (!rec) {
                res.status(404).json({
                    message: "Post Not Found"
                });
            }
            rec.dislikes = rec.dislikes + 1;
            rec.save();
            res.status(200).json({
                message: "Post Liked"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.delete("/:id", (req, res) => {
    Post.remove({ _id: req.params.id })
        .then(rec => {
            res.status(200).json({
                message: "Post Deleted"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;
