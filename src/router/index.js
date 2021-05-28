const express = require('express')
const router = express.Router();
const User = require('../models/user')
const { signup } = require('../controller/uder')

router.post('/signup', signup)

router.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello from Home"
    })
})


// router.post('signup',  )


module.exports = router;