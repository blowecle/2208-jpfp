const router = require('express').Router();

router.use('/campuses', require('./campuses'))
router.use('/students', require('./students'))

//api error handling
router.use((req, res, next) => {
    const error = new Error('API route does not exist')
    error.status = 404
    next(error)
})

module.exports = router;