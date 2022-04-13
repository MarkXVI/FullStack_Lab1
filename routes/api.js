const router = require('express').Router();
const User = require('../model/User');

router.get("/user", async (req, res) => {
    const users = await User.find();
    res.send(users);
});

router.get("/user/:id", async (req, res) => {
    let id = req.params.id;
    const user = await User.findOne({ id: id });
    res.send(user);
});

router.post("/user/register", async (req, res) => {
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