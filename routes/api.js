const router = require('express').Router();
const User = require('../model/User');

router.get("/user", async (req, res) => {
    const users = await User.find();
    res.send(users);
});

router.get("/user/:name", async (req, res) => {
    const user = await User.findOne({ name: req.params.name });

    if (!user) {
        return res.status(400).json({ error: 'Name not found!'});
    };

    res.send(user);
});

router.post("/user/update/:name", async (req, res) => {

    const user = await User.findOne({ name: req.params.name });
    
    if (!user) {
        return res.status(400).json({ error: 'Name not found!'});
    };

    await User.updateOne(
        { name: user.name },
        { $set: { 
            name: (req.body.name ? req.body.name :user.name),
            age: (req.body.age ? req.body.age : user.age),
            gender: req.body.gender 
        }}
    );

    res.send(200);

});

router.post("/user/delete/:name", async (req, res) => {

    const found = await User.deleteOne({ name: req.params.name });

    if (!found) {
        return res.status(400).json({ error: 'Name not found!'});
    };
    res.send(200);
});

router.post("/user/register", async (req, res) => {

    const nameExists = await User.findOne({ name: req.body.name });

    if (nameExists) {
        return res.status(400).json({ error: 'Name already exists!'});
    };

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