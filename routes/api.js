const router = require('express').Router();
const User = require('../model/User');

router.get("/user", async (req, res) => {
    const users = await User.find();
    res.send(users);
});

router.get("/user/:name", async (req, res) => {
    let name = req.params.name;
    const user = await User.findOne({ name: name });
    res.send(user);
});

router.post("/user/delete/:name", async (req, res) => {
    let name = req.params.name;
    await User.deleteOne({ name: name });
    res.send(name);
});

router.post("/user/register", async (req, res) => {
    const user = new User({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender
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