const router = require('express').Router();
const User = require('../model/User');

router.get("/", async (req, res) => {
    const users = await User.find();
    res.send(users);
});

router.get("/:name", async (req, res) => {
    let name = req.params.name[0].toUpperCase() + req.params.name.substring(1, req.params.name.length);
    const user = await User.findOne({ name: name });
    res.send(user);
});

router.post("/register", async (req, res) => {
    const user = new User({
        name: req.body.name,
        age: req.body.age
    });
    user.save()
        .then(user => {
            console.log('User saved' , user);
            res.json({
                success: true,
                user
            });
        }).catch(err => {
            console.error(err);
        });
});


module.exports = router