const { propertyTypesFormatter, usersFormatter } = require('../utils');

describe('Property types formatter', () => {
  test('should return the data type object', () => {
    const dataInput = [];
    const dataOutput = typeof [];
    const dataReturned = propertyTypesFormatter(dataInput);

    expect(typeof dataReturned).toBe(dataOutput);
  });
  test('should return an array containing a single nested array, with the array elements being the object property values', () => {
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
  test('should return an array containing multiple nested arrays, with the array elements being the object property values', () => {
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

describe('Users types formatter', () => {
  test('should return the data type object', () => {
    const dataInput = [];
    const dataOutput = typeof [];
    const dataReturned = usersFormatter(dataInput);

    expect(typeof dataReturned).toBe(dataOutput);
  });
  test('should return an array containing a single nested array, with the array elements being the object property values', () => {
    const dataInput = [
      {
        first_name: 'Alice',
        surname: 'Johnson',
        email: 'alice@example.com',
        phone_number: '+44 7000 111111',
        role: 'host',
        avatar: 'https://example.com/images/alice.jpg',
      },
    ];
    const dataOutput = [
      [
        'Alice',
        'Johnson',
        'alice@example.com',
        '+44 7000 111111',
        true,
        'https://example.com/images/alice.jpg',
      ],
    ];
    const dataReturned = usersFormatter(dataInput);

    expect(dataReturned).toEqual(dataOutput);
  });
  test('should return an array containing multiple nested arrays, with the array elements being the object property values', () => {
    const dataInput = [
      {
        first_name: 'Alice',
        surname: 'Johnson',
        email: 'alice@example.com',
        phone_number: '+44 7000 111111',
        role: 'host',
        avatar: 'https://example.com/images/alice.jpg',
      },
      {
        first_name: 'Bob',
        surname: 'Smith',
        email: 'bob@example.com',
        phone_number: '+44 7000 222222',
        role: 'guest',
        avatar: 'https://example.com/images/bob.jpg',
      },
    ];
    const dataOutput = [
      [
        'Alice',
        'Johnson',
        'alice@example.com',
        '+44 7000 111111',
        true,
        'https://example.com/images/alice.jpg',
      ],
      [
        'Bob',
        'Smith',
        'bob@example.com',
        '+44 7000 222222',
        false,
        'https://example.com/images/bob.jpg',
      ],
    ];
    const dataReturned = usersFormatter(dataInput);

    expect(dataReturned).toEqual(dataOutput);
  });
});
