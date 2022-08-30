const router = require('express').Router()
const Campus = require('../db/Campus')
const Student = require('../db/Student')

//GET /api/campuses/
//list all campuses
router.get('/', async (req, res, next) => {
    try {
      const campuses = await Campus.findAll()
      res.send(campuses)
    } catch (error) {
      next(error)
    }
  })

//GET /api/campuses/:id
//list campus where id: req.params.id
router.get('/:id', async (req, res, next) => {
    try{
        const campus = await Campus.findByPk(req.params.id)
        res.send(campus);
    } catch(error) {
        next(error);
    }
})

  //GET /api/campuses/:id/students
  //list all students at campus: req.params.id
router.get('/:id/students', async (req, res, next) => {
    try {
        const students = await Student.findAll({
            where: {
                campusId: req.params.id
            }
        })
        res.send(students)
    } catch (error) {
        next(error);
    }
})

module.exports = router;