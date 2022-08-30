const router = require('express').Router()
const Campus = require('../db/Campus')

//GET /api/campuses
router.get('/campuses', async (req, res, next) => {
    try {
      const campuses = await Campus.findAll()
      res.send(campuses)
    } catch (error) {
      next(error)
    }
  })

module.exports = router;