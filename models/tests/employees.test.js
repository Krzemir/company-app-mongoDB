const { expect } = require( 'chai' );
const mongoose = require('mongoose');
const Employee = require('../employees.model');

describe ('Employee', () => {
  it('should throw an error if no "firstName" arg', () => {
    const employee = new Employee({firstName: {}, lastName: "Doe", department: "IT"});
    employee.validate(err => {
      expect(err.errors.firstName).to.exist;
    });
  });
  it('should throw an error if no "lastName" arg', () => {
    const employee = new Employee({firstName: "John", lastName: {}, department: "IT"});
    employee.validate(err => {
      expect(err.errors.lastName).to.exist;
    });
  });
  it('should throw an error if no "department" arg', () => {
    const employee = new Employee({firstName: "John", lastName: "Doe", department: {}});
    employee.validate(err => {
      expect(err.errors.department).to.exist;
    });
  })

  it('should throw an error if even one of arguments is not a string', () => {
    const cases = [{}, []];
    for(let firstName of cases) {
      const employee = new Employee({firstName: firstName, lastName: "Doe", department: "IT"});
      employee.validate(err => {
        expect(err.errors.firstName).to.exist;
      });
    }
    for(let lastName of cases) {
      const employee = new Employee({firstName: "John", lastName: lastName, department: "IT"});
      employee.validate(err => {
        expect(err.errors.lastName).to.exist;
      });
    }
    for(let department of cases) {
      const employee = new Employee({firstName: "John", lastName: "Doe", department: department});
      employee.validate(err => {
        expect(err.errors.department).to.exist;
      });
    }
  });

  it('should not throw an error if all arg are OK', () => {
    const firstName = "John";
    const lastName = "Doe";
    const department = "IT";
    
    const employee = new Employee({ firstName, lastName, department });

    employee.validate(err => {
    expect(err).to.not.exist;
    });
  });
})