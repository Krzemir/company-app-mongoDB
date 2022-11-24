const Employee = require('../employees.model');
const { expect } = require( 'chai' );
const mongoose = require('mongoose');


describe('Employee', () => {

  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    } 
    catch (err) {
      console.error(err);
    }
  });

  describe('Reading data', async () => {

    before(async () => {
      const employeeOne = await new Employee({firstName: 'EmployeeOneFirstName', lastName: 'EmployeeOneLastName', department: 'departmentOne'});
      await employeeOne.save();

      const employeeTwo = await new Employee({firstName: 'EmployeeTwoFirstName', lastName: 'EmployeeTwoLastName', department: 'departmentTwo'});
      await employeeTwo.save();

    })

    it('should return all the data with find method', async () => {
      const employees = await Employee.find()
      expect(employees.length).to.be.equal(2);
    }) 

    it('should return proper document by various params with findOne method', async () => {
      const documentByFirstName = await Employee.findOne({firstName: 'EmployeeOneFirstName'});
      const documentByLastName = await Employee.findOne({lastName: 'EmployeeOneLastName'});
      const documentByDepartment = await Employee.findOne({department: 'departmentOne'});

      expect(documentByFirstName.firstName).to.be.equal('EmployeeOneFirstName');
      expect(documentByLastName.lastName).to.be.equal('EmployeeOneLastName');
      expect(documentByDepartment.department).to.be.equal('departmentOne')
    })

    after(async () => {
      await Employee.deleteMany();
    })
  })

  describe('Creating data', () => {

    it('should insert new document with insertOne method', async () => {
      const employee = new Employee({ firstName: 'EmployeeOneFirstName', lastName: 'EmployeeOneLastName', department: 'departmentOne' });
      await employee.save();
      
      expect(employee.isNew).to.be.false;
    })

    after(async () => {
      await Employee.deleteMany();
    });

  })

  describe('Updating data', () => {

    beforeEach(async () => {
      const employeeOne = await new Employee({firstName: 'EmployeeOneFirstName', lastName: 'EmployeeOneLastName', department: 'departmentOne'});
      await employeeOne.save();

      const employeeTwo = await new Employee({firstName: 'EmployeeTwoFirstName', lastName: 'EmployeeTwoLastName', department: 'departmentTwo'});
      await employeeTwo.save();
    })

    it('should properly update one document with updateOne method', async () => {
      await Employee.updateOne({ firstName: 'EmployeeOneFirstName' }, { $set: { firstName: '=EmployeeOneFirstName=' }} );
      const updatedEmployee = await Employee.findOne({ firstName: '=EmployeeOneFirstName=' });
      expect(updatedEmployee).to.not.be.null;
    })

    it('should properly update one document with save method', async () => {
      const updatedEmployee = await Employee.findOne({ firstName: 'EmployeeOneFirstName' });
      updatedEmployee.firstName = '=EmployeeOneFirstName=';
      updatedEmployee.save();
      expect(updatedEmployee.firstName).to.be.equal('=EmployeeOneFirstName=');      
    })

    it('should properly update multiple documents with updateMany method', async () => {
      await Employee.updateMany({}, { $set: { firstName: 'Updated!' } });
      const employees = await Employee.find({ firstName: 'Updated!' });
      expect(employees.length).to.be.equal(2);
    })

    afterEach(async () => {
      await Employee.deleteMany();
    });
  })

  describe('Removing data', () => {

    beforeEach(async () => {
      const employeeOne = await new Employee({firstName: 'EmployeeOneFirstName', lastName: 'EmployeeOneLastName', department: 'departmentOne'});
      await employeeOne.save();

      const employeeTwo = await new Employee({firstName: 'EmployeeTwoFirstName', lastName: 'EmployeeTwoLastName', department: 'departmentTwo'});
      await employeeTwo.save();
    })

    it('should properly remove one document with deleteOne method,', async () => {
      await Employee.deleteOne({ firstName: 'EmployeeOneFirstName' });
      const removedEmployee = await Employee.findOne({ firstName: 'EmployeeOneFirstName' });
      expect(removedEmployee).to.be.null;
    })

    it('should properly remove one document with remove method', async () => {
      const employee = await Employee.findOne({ firstName: 'EmployeeOneFirstName' });
      await employee.remove();
      const removedEmployee = await Employee.findOne({ firstName: 'EmployeeOneFirstName' });
      expect(removedEmployee).to.be.null;
    })

    it('should properly remove multiple documents with deleteMany method', async () => {
      await Employee.deleteMany();
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(0);      
    })

    afterEach(async () => {
      await Employee.deleteMany();
    });
  })

})