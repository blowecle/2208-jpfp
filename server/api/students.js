const router = require('express').Router()
const Student = require('../db/Student')

//GET /api/students
//get all students
router.get('/', async (req, res, next) => {
  try {
    res.send(await Student.findAll());
  } catch (error) {
      next(error)
  }
})

//GET /api/students/:id
//get single student where id: req.params.id
router.get('/:id', async (req, res, next) => {
    try {
        res.send(await Student.findAll({
            where: {
                id: req.params.id
            }
        }))
    } catch(error) {
        next(error);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        await Student.destroy({
            where: {
                id: req.params.id,
            }
        })
        res.sendStatus(200)
    } catch(error) {
        next(error);
    }
})

module.exports = router;