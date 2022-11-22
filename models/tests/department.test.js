const { expect } = require( 'chai' );
const mongoose = require('mongoose')
const Department = require( '../department.model' );


describe('Department', () => {

    it('should throw an error if no "name" arg', () => {
      const dep = new Department({}); // create new Department, but don't set `name` attr value
      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
    });

    it('should throw an error if "name" is not a string', () => {
      const cases = [{}, []];
      for(let name of cases) {
        const dep = new Department({ name });

        dep.validate(err => {
          expect(err.errors.name).to.exist;
        });
      }
    });

    it('should trow an error if name is longer than 20 and shorter than 5 signs', () => {

      const cases = [ '123', 'abcd', '123456789012345678901', ' ' ];
      for(let name of cases) {
      const dep = new Department({ name });
      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
    });

    it('should not throw an error if "name" arg is OK', () => {
      const cases = ['Management', 'Human Resources'];
      for(let name of cases) {
      const dep = new Department({ name });

      dep.validate(err => {
      expect(err).to.not.exist;
      });

      }
    });
  });

  after(() => {
    mongoose.models = {};
  });