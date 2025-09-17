const {
  propertyTypesFormatter,
  usersFormatter,
  usersLookup,
  propertiesFormatter,
} = require('../utils');

describe('Property types formatter', () => {
  test('should return an array', () => {
    const dataInput = [];
    const dataOutput = true;
    const dataReturned = propertyTypesFormatter(dataInput);

    expect(Array.isArray(dataReturned)).toBe(dataOutput);
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

    expect(dataReturned[0][0]).toBe('Apartment');
    expect(dataReturned[0][1]).toBe('Description of Apartment.');
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

    expect(dataReturned[0][0]).toBe('Apartment');
    expect(dataReturned[0][1]).toBe('Description of Apartment.');
    expect(dataReturned[1][0]).toBe('House');
    expect(dataReturned[1][1]).toBe('Description of House.');
    expect(dataReturned).toEqual(dataOutput);
  });
});

describe('Users types formatter', () => {
  test('should return an array', () => {
    const dataInput = [];
    const dataOutput = true;
    const dataReturned = usersFormatter(dataInput);

    expect(Array.isArray(dataReturned)).toBe(dataOutput);
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

    expect(dataReturned[0][0]).toBe('Alice');
    expect(dataReturned[0][1]).toBe('Johnson');
    expect(dataReturned[0][2]).toBe('alice@example.com');
    expect(dataReturned[0][3]).toBe('+44 7000 111111');
    expect(dataReturned[0][4]).toBe(true);
    expect(dataReturned[0][5]).toBe('https://example.com/images/alice.jpg');
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

    expect(dataReturned[0][0]).toBe('Alice');
    expect(dataReturned[0][1]).toBe('Johnson');
    expect(dataReturned[0][2]).toBe('alice@example.com');
    expect(dataReturned[0][3]).toBe('+44 7000 111111');
    expect(dataReturned[0][4]).toBe(true);
    expect(dataReturned[0][5]).toBe('https://example.com/images/alice.jpg');
    expect(dataReturned[1][0]).toBe('Bob');
    expect(dataReturned[1][1]).toBe('Smith');
    expect(dataReturned[1][2]).toBe('bob@example.com');
    expect(dataReturned[1][3]).toBe('+44 7000 222222');
    expect(dataReturned[1][4]).toBe(false);
    expect(dataReturned[1][5]).toBe('https://example.com/images/bob.jpg');
    expect(dataReturned).toEqual(dataOutput);
  });
});

describe('Users lookup object', () => {
  test('should return the data type object', () => {
    const dataInput = [];
    const dataOutput = typeof {};
    const dataReturned = usersLookup(dataInput);

    expect(typeof dataReturned).toBe(dataOutput);
  });
  test('should return an object containing a single property, where the key is the full name and value is the user id', () => {
    const dataInput = [
      {
        user_id: 1,
        first_name: 'Alice',
        surname: 'Johnson',
        email: 'alice@example.com',
        phone_number: '+44 7000 111111',
        is_host: true,
        avatar: 'https://example.com/images/alice.jpg',
      },
    ];
    const dataOutput = { 'Alice Johnson': 1 };
    const dataReturned = usersLookup(dataInput);

    expect(dataReturned).toHaveProperty('Alice Johnson');
    expect(dataReturned['Alice Johnson']).toBe(1);
    expect(dataReturned).toEqual(dataOutput);
  });
  test('should return an object containing multiple properties, where all the keys are the full names and all the values are the user ids', () => {
    const dataInput = [
      {
        user_id: 1,
        first_name: 'Alice',
        surname: 'Johnson',
        email: 'alice@example.com',
        phone_number: '+44 7000 111111',
        is_host: true,
        avatar: 'https://example.com/images/alice.jpg',
      },
      {
        user_id: 2,
        first_name: 'Bob',
        surname: 'Smith',
        email: 'bob@example.com',
        phone_number: '+44 7000 222222',
        is_host: false,
        avatar: 'https://example.com/images/bob.jpg',
      },
    ];
    const dataOutput = { 'Alice Johnson': 1, 'Bob Smith': 2 };
    const dataReturned = usersLookup(dataInput);

    expect(dataReturned).toHaveProperty('Alice Johnson');
    expect(dataReturned).toHaveProperty('Bob Smith');
    expect(dataReturned['Alice Johnson']).toBe(1);
    expect(dataReturned['Bob Smith']).toBe(2);
    expect(dataReturned).toEqual(dataOutput);
  });
});

describe('Properties formatter', () => {
  test('should return an array', () => {
    const dataInput = [];
    const dataOutput = true;
    const dataReturned = propertiesFormatter(dataInput);

    expect(Array.isArray(dataReturned)).toBe(dataOutput);
  });
  test('should return an array containing a single nested array, with the array elements being the object property values', () => {
    const dataInput1 = [
      {
        user_id: 1,
        first_name: 'Alice',
        surname: 'Johnson',
        email: 'alice@example.com',
        phone_number: '+44 7000 111111',
        is_host: true,
        avatar: 'https://example.com/images/alice.jpg',
      },
    ];
    const dataInput2 = [
      {
        name: 'Modern Apartment in City Center',
        property_type: 'Apartment',
        location: 'London, UK',
        price_per_night: 120.0,
        description: 'Description of Modern Apartment in City Center.',
        host_name: 'Alice Johnson',
        amenities: ['WiFi', 'TV', 'Kitchen'],
      },
    ];
    const dataOutput = [
      [
        1,
        'Modern Apartment in City Center',
        'London, UK',
        'Apartment',
        120,
        'Description of Modern Apartment in City Center.',
      ],
    ];

    const dataReturned1 = usersLookup(dataInput1);
    const dataReturned2 = propertiesFormatter(dataInput2, dataReturned1);

    expect(dataReturned2[0][0]).toBe(1);
    expect(dataReturned2[0][1]).toBe('Modern Apartment in City Center');
    expect(dataReturned2[0][2]).toBe('London, UK');
    expect(dataReturned2[0][3]).toBe('Apartment');
    expect(dataReturned2[0][4]).toBe(120);
    expect(dataReturned2[0][5]).toBe(
      'Description of Modern Apartment in City Center.'
    );
    expect(dataReturned2).toEqual(dataOutput);
  });
  test('should return an array containing multiple nested arrays, with the array elements being the object property values', () => {
    const dataInput1 = [
      {
        user_id: 1,
        first_name: 'Alice',
        surname: 'Johnson',
        email: 'alice@example.com',
        phone_number: '+44 7000 111111',
        is_host: true,
        avatar: 'https://example.com/images/alice.jpg',
      },
    ];
    const dataInput2 = [
      {
        name: 'Modern Apartment in City Center',
        property_type: 'Apartment',
        location: 'London, UK',
        price_per_night: 120.0,
        description: 'Description of Modern Apartment in City Center.',
        host_name: 'Alice Johnson',
        amenities: ['WiFi', 'TV', 'Kitchen'],
      },
      {
        name: 'Cosy Family House',
        property_type: 'House',
        location: 'Manchester, UK',
        price_per_night: 150.0,
        description: 'Description of Cosy Family House.',
        host_name: 'Alice Johnson',
        amenities: ['WiFi', 'TV', 'Kitchen'],
      },
    ];
    const dataOutput = [
      [
        1,
        'Modern Apartment in City Center',
        'London, UK',
        'Apartment',
        120.0,
        'Description of Modern Apartment in City Center.',
      ],
      [
        1,
        'Cosy Family House',
        'Manchester, UK',
        'House',
        150.0,
        'Description of Cosy Family House.',
      ],
    ];
    const dataReturned1 = usersLookup(dataInput1);
    const dataReturned2 = propertiesFormatter(dataInput2, dataReturned1);

    expect(dataReturned2[0][0]).toBe(1);
    expect(dataReturned2[0][1]).toBe('Modern Apartment in City Center');
    expect(dataReturned2[0][2]).toBe('London, UK');
    expect(dataReturned2[0][3]).toBe('Apartment');
    expect(dataReturned2[0][4]).toBe(120);
    expect(dataReturned2[0][5]).toBe(
      'Description of Modern Apartment in City Center.'
    );
    expect(dataReturned2[1][0]).toBe(1);
    expect(dataReturned2[1][1]).toBe('Cosy Family House');
    expect(dataReturned2[1][2]).toBe('Manchester, UK');
    expect(dataReturned2[1][3]).toBe('House');
    expect(dataReturned2[1][4]).toBe(150);
    expect(dataReturned2[1][5]).toBe('Description of Cosy Family House.');
    expect(dataReturned2).toEqual(dataOutput);
  });
});
