const router = require('express').Router();
const { validateRegister, validateLogin, validateUpdate, validateDelete } = require('../validate'); 

const signale = require('signale');

router.post('/register', async (req, res) => {
    signale.debug('registering...');

    const { error } = validateRegister('register', req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    };

    const emailExists = await Person.findOne({ email: req.body.email });

    if (emailExists) {
        return res.status(400).json({ error: 'Email already exists!'});
    };

    const user = new Person({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        email: req.body.email,
        password: hashPassword
    });

    signale.complete(user);

    try {
        const savedUser = await user.save();
        const token = jwt.sign({ _id: user._id, type: 'register', name: 'User'}, process.env.SECRET_TOKEN);
        res.json({user: user._id, redirect: 'secure', token});
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    signale.debug('Logging in...');

    const { error } = validateLogin(req.body);

    if (error) {
        res.status(400).json({ error: error.details[0].message });
    };

    const user = await Person.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).json({ error: 'Email not found!'});
    };

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) {
        return res.status(400).json({ error: 'Invalid password!'})
    };

    const token = jwt.sign({ _id: user._id, type: 'login', name: user.firstName + ' ' + user.lastName}, process.env.SECRET_TOKEN);
    res.header('auth-token', token).json({token, redirect: 'secure'});

    signale.complete('Login Complete!');
    });

router.post('/update', async (req, res) => {
    signale.debug('Validating pet...');

    const { error } = validateUpdate(req.body);

    if (error) {
        res.status(400).json({ error: error.details[0].message });
    };

    const petExists = await Person.findOne({ pet: req.body });

    if (petExists) {
        return res.status(400).json({ error: 'Pet already exists!'});
    };

    const pet = new Pet({
        name: req.body.name,
        type: req.body.type,
        race: req.body.race,
        birthDate: req.body.birthDate
    });

    signale.complete(pet);

    try {
        const savedPet = await pet.save();
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
        res.json({user: user._id, redirect: 'secure', token});
    } catch (err) {
        res.status(400).json(err);
    };
    signale.complete('Pet Added!');
});

router.post('/delete', async (req, res) => {
    signale.debug('Validating pet...');

    const { error } = validateDelete(req.body);

    if (error) {
        res.status(400).json({ error: error.details[0].message });
    };

    const petExists = await Person.findOne({ pet: req.body });

    if (petExists) {
        return res.status(400).json({ error: 'Pet already exists!'});
    };

    const pet = new Pet({
        name: req.body.name,
        type: req.body.type,
        race: req.body.race,
        birthDate: req.body.birthDate
    });

    signale.complete(pet);

    try {
        const savedPet = await pet.save();
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
        res.json({user: user._id, redirect: 'secure', token});
    } catch (err) {
        res.status(400).json(err);
    };
    signale.complete('Pet Added!');
});

module.exports = router;