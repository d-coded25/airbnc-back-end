const { propertyTypesFormatter } = require('../utils');

describe('Property types formatter', () => {
  test('should return the data type object', () => {
    const dataInput = [];
    const dataOutput = typeof [];
    const dataReturned = propertyTypesFormatter(dataInput);

    expect(typeof dataReturned).toBe(dataOutput);
  });
  test('should return an array containing a single nested array, where the array elements are based on the object property values', () => {
    const dataInput = [
      {
        property_type: 'Apartment',
        description: 'Description of Apartment.',
      },
    ];
    const dataOutput = [['Apartment', 'Description of Apartment.']];
    const dataReturned = propertyTypesFormatter(dataInput);

    expect(dataReturned).toEqual(dataOutput);
  });
  test('should return an array containing multiple nested arrays, where the array elements are based on the object property values', () => {
    const dataInput = [
      {
        property_type: 'Apartment',
        description: 'Description of Apartment.',
      },
      {
        property_type: 'House',
        description: 'Description of House.',
      },
    ];
    const dataOutput = [
      ['Apartment', 'Description of Apartment.'],
      ['House', 'Description of House.'],
    ];
    const dataReturned = propertyTypesFormatter(dataInput);

    expect(dataReturned).toEqual(dataOutput);
  });
});
