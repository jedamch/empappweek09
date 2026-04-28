const Employee = require('../models/Employee'); 

  

exports.index = async (req, res) => { 

  try { 

    const employees = await Employee.find().sort({ createdAt: -1 }); 

    res.render('employees/index', { 

      title: 'Employees', 

      employees 

    }); 

  } catch (error) { 

    console.error(error); 

    req.flash('error', 'Unable to load employees.'); 

    res.redirect('/'); 

  } 

}; 

  

exports.create = (req, res) => { 

  res.render('employees/create', { title: 'Add Employee' }); 

}; 

  

exports.store = async (req, res) => { 

  try { 

    const { 

      firstName, 

      lastName, 

      email, 

      phone, 

      department, 

      position, 

      salary, 

      joiningDate 

    } = req.body; 

  

    if (!firstName || !lastName || !email || !phone || !department || !position || !salary || !joiningDate) { 

      req.flash('error', 'All employee fields are required.'); 

      return res.redirect('/employees/create'); 

    } 

  

    await Employee.create({ 

      firstName, 

      lastName, 

      email, 

      phone, 

      department, 

      position, 

      salary, 

      joiningDate, 

      createdBy: req.session.user.id 

    }); 

  

    req.flash('success', 'Employee added successfully.'); 

    res.redirect('/employees'); 

  } catch (error) { 

    console.error(error); 

    req.flash('error', 'Unable to add employee. Email may already exist.'); 

    res.redirect('/employees/create'); 

  } 

}; 

  

exports.show = async (req, res) => { 

  try { 

    const employee = await Employee.findById(req.params.id); 

    if (!employee) { 

      req.flash('error', 'Employee not found.'); 

      return res.redirect('/employees'); 

    } 

  

    res.render('employees/show', { 

      title: 'Employee Details', 

      employee 

    }); 

  } catch (error) { 

    console.error(error); 

    req.flash('error', 'Invalid employee request.'); 

    res.redirect('/employees'); 

  } 

}; 

  

exports.edit = async (req, res) => { 

  try { 

    const employee = await Employee.findById(req.params.id); 

    if (!employee) { 

      req.flash('error', 'Employee not found.'); 

      return res.redirect('/employees'); 

    } 

  

    res.render('employees/edit', { 

      title: 'Edit Employee', 

      employee 

    }); 

  } catch (error) { 

    console.error(error); 

    req.flash('error', 'Invalid employee request.'); 

    res.redirect('/employees'); 

  } 

}; 

  

exports.update = async (req, res) => { 

  try { 

    const { 

      firstName, 

      lastName, 

      email, 

      phone, 

      department, 

      position, 

      salary, 

      joiningDate 

    } = req.body; 

  

    await Employee.findByIdAndUpdate( 

      req.params.id, 

      { 

        firstName, 

        lastName, 

        email, 

        phone, 

        department, 

        position, 

        salary, 

        joiningDate 

      }, 

      { runValidators: true } 

    ); 

  

    req.flash('success', 'Employee updated successfully.'); 

    res.redirect('/employees'); 

  } catch (error) { 

    console.error(error); 

    req.flash('error', 'Unable to update employee.'); 

    res.redirect(`/employees/${req.params.id}/edit`); 

  } 

}; 

  

exports.destroy = async (req, res) => { 

  try { 

    await Employee.findByIdAndDelete(req.params.id); 

    req.flash('success', 'Employee deleted successfully.'); 

    res.redirect('/employees'); 

  } catch (error) { 

    console.error(error); 

    req.flash('error', 'Unable to delete employee.'); 

    res.redirect('/employees'); 

  } 

}; 
