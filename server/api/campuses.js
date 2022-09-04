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

router.delete('/:id', async (req, res, next) => {
    try {
            await Student.update({campusId: null}, {
                where:{
                    campusId: req.params.id,
                }
            })
            await Campus.destroy({
                where: {
                    id: req.params.id,
                }
            })
            res.sendStatus(200)
    } catch (error) {
        console.error('campuses.delete()', error)
        next(error);
    }
})

//POST /api/campuses/
//create campus using req.body
router.post('/', async (req, res, next) => {
    try {
      res.status(201).send(await Student.create(req.body));
    } catch (error) {
      next(error);
    }
  });

//PUT /api/campuses/:id
//edit campus where id: req.params.id
router.put(`/:id`, async (req, res, next) => {
    try {
        const campus = await Campus.findByPk(req.params.id);
        res.send(await campus.update(req.body));
    } catch(error){
        next(error);
    }
})

module.exports = router;