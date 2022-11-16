const express = require('express');
const router = express.Router();
const DepartmentController = require('../controllers/department.controller')

router.get('/departments', DepartmentController.getAll)
router.get('/departments/random', DepartmentController.getRandom)
router.get('/departments/:id', DepartmentController.getId)
router.post('/departments', DepartmentController.postOne)
router.put('/departments/:id', DepartmentController.putOne)
router.delete('/departments/:id', DepartmentController.deleteOne)

module.exports = router;