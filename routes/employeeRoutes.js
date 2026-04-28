const express = require('express'); 

const router = express.Router(); 

const employeeController = require('../controllers/employeeController'); 

const { requireLogin } = require('../middleware/authMiddleware'); 

  

router.use(requireLogin); 

  

router.get('/', employeeController.index); 

router.get('/create', employeeController.create); 

router.post('/', employeeController.store); 

router.get('/:id', employeeController.show); 

router.get('/:id/edit', employeeController.edit); 

router.put('/:id', employeeController.update); 

router.delete('/:id', employeeController.destroy); 

  

module.exports = router; 