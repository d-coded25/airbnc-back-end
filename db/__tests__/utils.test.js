const {
  propertyTypesFormatter,
  usersFormatter,
  usersLookup,
  propertiesFormatter,
  guestsLookup,
  propertiesLookup,
  reviewsFormatter,
} = require('../utils');

describe('Property types formatter function', () => {
  test('should return an array', () => {
    const dataInput = [];
    const dataOutput = true;
    const dataReturned = propertyTypesFormatter(dataInput);

    expect(Array.isArray(dataReturned)).toBe(dataOutput);
  });
  test('should return an array containing a single nested array, with the array elements being the object property values', () => {
    const propertyTypesInputData = [
      {
        property_type: 'Apartment',
        description: 'Description of Apartment.',
      },
    ];
    const propertyTypesOutputData = [
      ['Apartment', 'Description of Apartment.'],
    ];
    const propertyTypesFormatted = propertyTypesFormatter(
      propertyTypesInputData
    );

    expect(propertyTypesFormatted).toEqual(propertyTypesOutputData);
    expect(propertyTypesFormatted[0][0]).toBe('Apartment');
    expect(propertyTypesFormatted[0][1]).toBe('Description of Apartment.');
  });
  test('should return an array containing multiple nested arrays, with the array elements being the object property values', () => {
    const propertyTypesInputData = [
      {
        property_type: 'Apartment',
        description: 'Description of Apartment.',
      },
      {
        property_type: 'House',
        description: 'Description of House.',
      },
    ];
    const propertyTypesOutputData = [
      ['Apartment', 'Description of Apartment.'],
      ['House', 'Description of House.'],
    ];
    const propertyTypesFormattedData = propertyTypesFormatter(
      propertyTypesInputData
    );

    expect(propertyTypesFormattedData).toEqual(propertyTypesOutputData);
    expect(propertyTypesFormattedData[0][0]).toBe('Apartment');
    expect(propertyTypesFormattedData[0][1]).toBe('Description of Apartment.');
    expect(propertyTypesFormattedData[1][0]).toBe('House');
    expect(propertyTypesFormattedData[1][1]).toBe('Description of House.');
  });
});

describe('Users formatter function', () => {
  test('should return an array', () => {
    const dataInput = [];
    const dataOutput = true;
    const dataReturned = usersFormatter(dataInput);

    expect(Array.isArray(dataReturned)).toBe(dataOutput);
  });
  test('should return an array containing a single nested array, with the array elements being the object property values', () => {
    const usersInputData = [
      {
        first_name: 'Alice',
        surname: 'Johnson',
        email: 'alice@example.com',
        phone_number: '+44 7000 111111',
        role: 'host',
        avatar: 'https://example.com/images/alice.jpg',
      },
    ];
    const usersOutputData = [
      [
        'Alice',
        'Johnson',
        'alice@example.com',
        '+44 7000 111111',
        true,
        'https://example.com/images/alice.jpg',
      ],
    ];
    const usersFormattedData = usersFormatter(usersInputData);

    expect(usersFormattedData).toEqual(usersOutputData);
    expect(usersFormattedData[0][0]).toBe('Alice');
    expect(usersFormattedData[0][1]).toBe('Johnson');
    expect(usersFormattedData[0][2]).toBe('alice@example.com');
    expect(usersFormattedData[0][3]).toBe('+44 7000 111111');
    expect(usersFormattedData[0][4]).toBe(true);
    expect(usersFormattedData[0][5]).toBe(
      'https://example.com/images/alice.jpg'
    );
  });
  test('should return an array containing multiple nested arrays, with the array elements being the object property values', () => {
    const usersInputData = [
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
    const usersOutputData = [
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
    const usersFormattedData = usersFormatter(usersInputData);

    expect(usersFormattedData).toEqual(usersOutputData);
    expect(usersFormattedData[0][0]).toBe('Alice');
    expect(usersFormattedData[0][1]).toBe('Johnson');
    expect(usersFormattedData[0][2]).toBe('alice@example.com');
    expect(usersFormattedData[0][3]).toBe('+44 7000 111111');
    expect(usersFormattedData[0][4]).toBe(true);
    expect(usersFormattedData[0][5]).toBe(
      'https://example.com/images/alice.jpg'
    );
    expect(usersFormattedData[1][0]).toBe('Bob');
    expect(usersFormattedData[1][1]).toBe('Smith');
    expect(usersFormattedData[1][2]).toBe('bob@example.com');
    expect(usersFormattedData[1][3]).toBe('+44 7000 222222');
    expect(usersFormattedData[1][4]).toBe(false);
    expect(usersFormattedData[1][5]).toBe('https://example.com/images/bob.jpg');
  });
});

describe('Users lookup object function', () => {
  test('should return the data type object', () => {
    const dataInput = [];
    const dataOutput = typeof {};
    const dataReturned = usersLookup(dataInput);

    expect(typeof dataReturned).toBe(dataOutput);
  });
  test('should return an object containing a single property, where the key is the users full name and the value is the user id', () => {
    const dbUsersResponseData = [
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
    const usersOutputData = { 'Alice Johnson': 1 };
    const usersLookupData = usersLookup(dbUsersResponseData);

    expect(usersLookupData).toEqual(usersOutputData);
    expect(usersLookupData).toHaveProperty('Alice Johnson');
    expect(usersLookupData['Alice Johnson']).toBe(1);
  });
  test('should return an object containing multiple properties, where all the keys are the users full names and all the values are the user ids', () => {
    const dbUsersResponseData = [
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
    const usersOutputData = { 'Alice Johnson': 1, 'Bob Smith': 2 };
    const usersLookupData = usersLookup(dbUsersResponseData);

    expect(usersLookupData).toEqual(usersOutputData);
    expect(usersLookupData).toHaveProperty('Alice Johnson');
    expect(usersLookupData).toHaveProperty('Bob Smith');
    expect(usersLookupData['Alice Johnson']).toBe(1);
    expect(usersLookupData['Bob Smith']).toBe(2);
  });
});

describe('Properties formatter function', () => {
  test('should return an array', () => {
    const dataInput = [];
    const dataOutput = true;
    const dataReturned = propertiesFormatter(dataInput);

    expect(Array.isArray(dataReturned)).toBe(dataOutput);
  });
  test('should return an array containing a single nested array, with the array elements being the objects property values', () => {
    const propertiesInputData = [
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
    const dbUsersResponseData = [
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
    const propertiesOutputData = [
      [
        1,
        'Modern Apartment in City Center',
        'London, UK',
        'Apartment',
        120,
        'Description of Modern Apartment in City Center.',
      ],
    ];

    const usersLookupData = usersLookup(dbUsersResponseData);
    const propertiesFormattedData = propertiesFormatter(
      propertiesInputData,
      usersLookupData
    );

    expect(propertiesFormattedData).toEqual(propertiesOutputData);
    expect(propertiesFormattedData[0][0]).toBe(1);
    expect(propertiesFormattedData[0][1]).toBe(
      'Modern Apartment in City Center'
    );
    expect(propertiesFormattedData[0][2]).toBe('London, UK');
    expect(propertiesFormattedData[0][3]).toBe('Apartment');
    expect(propertiesFormattedData[0][4]).toBe(120);
    expect(propertiesFormattedData[0][5]).toBe(
      'Description of Modern Apartment in City Center.'
    );
  });
  test('should return an array containing multiple nested arrays, with the array elements being the object property values', () => {
    const propertiesInputData = [
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
    const dbUsersResponseData = [
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
    const propertiesOutputData = [
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
    const usersLookupData = usersLookup(dbUsersResponseData);
    const propertiesFormattedData = propertiesFormatter(
      propertiesInputData,
      usersLookupData
    );

    expect(propertiesFormattedData).toEqual(propertiesOutputData);
    expect(propertiesFormattedData[0][0]).toBe(1);
    expect(propertiesFormattedData[0][1]).toBe(
      'Modern Apartment in City Center'
    );
    expect(propertiesFormattedData[0][2]).toBe('London, UK');
    expect(propertiesFormattedData[0][3]).toBe('Apartment');
    expect(propertiesFormattedData[0][4]).toBe(120);
    expect(propertiesFormattedData[0][5]).toBe(
      'Description of Modern Apartment in City Center.'
    );
    expect(propertiesFormattedData[1][0]).toBe(1);
    expect(propertiesFormattedData[1][1]).toBe('Cosy Family House');
    expect(propertiesFormattedData[1][2]).toBe('Manchester, UK');
    expect(propertiesFormattedData[1][3]).toBe('House');
    expect(propertiesFormattedData[1][4]).toBe(150);
    expect(propertiesFormattedData[1][5]).toBe(
      'Description of Cosy Family House.'
    );
  });
});

describe('Guests lookup object function', () => {
  test('should return the data type object', () => {
    const dataInput = [];
    const dataOutput = typeof {};
    const dataReturned = usersLookup(dataInput);

    expect(typeof dataReturned).toBe(dataOutput);
  });
  test('should return an object where the keys are the users full names and the values are the user ids, but only if the user is a not a host (guest)', () => {
    const dbUsersResponseData = [
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
    const guestsOutputData = { 'Bob Smith': 2 };
    const guestsLookupData = guestsLookup(dbUsersResponseData);

    expect(guestsLookupData).toEqual(guestsOutputData);
    expect(guestsLookupData).toHaveProperty('Bob Smith');
    expect(guestsLookupData['Bob Smith']).toBe(2);
  });
});

describe('Properties lookup object function', () => {
  test('should return an object', () => {
    const dataInput = [];
    const dataOutput = typeof {};
    const dataReturned = propertiesLookup(dataInput);

    expect(typeof dataReturned).toBe(dataOutput);
  });
  test('should return an object containing a single property, where the key is the property name and the value is the property id', () => {
    const dbPropertiesResponseData = [
      {
        property_id: 1,
        host_id: 1,
        name: 'Modern Apartment in City Center',
        location: 'London, UK',
        property_type: 'Apartment',
        price_per_night: '120',
        description: 'Description of Modern Apartment in City Center.',
      },
    ];
    const propertiesOutputData = { 'Modern Apartment in City Center': 1 };
    const propertiesLookupData = propertiesLookup(dbPropertiesResponseData);

    expect(propertiesLookupData).toEqual(propertiesOutputData);
    expect(propertiesLookupData).toHaveProperty(
      'Modern Apartment in City Center'
    );
    expect(propertiesLookupData['Modern Apartment in City Center']).toBe(1);
  });
  test('should return an object containing multiple properties, where the keys are the property names and the value are the property ids', () => {
    const dbPropertiesResponseData = [
      {
        property_id: 1,
        host_id: 1,
        name: 'Modern Apartment in City Center',
        location: 'London, UK',
        property_type: 'Apartment',
        price_per_night: '120',
        description: 'Description of Modern Apartment in City Center.',
      },
      {
        property_id: 2,
        host_id: 1,
        name: 'Cosy Family House',
        location: 'Manchester, UK',
        property_type: 'House',
        price_per_night: '150',
        description: 'Description of Cosy Family House.',
      },
    ];
    const propertiesOutputData = {
      'Modern Apartment in City Center': 1,
      'Cosy Family House': 2,
    };
    const propertiesLookupData = propertiesLookup(dbPropertiesResponseData);

    expect(propertiesLookupData).toEqual(propertiesOutputData);
    expect(propertiesLookupData).toHaveProperty(
      'Modern Apartment in City Center'
    );
    expect(propertiesLookupData['Modern Apartment in City Center']).toBe(1);
    expect(propertiesLookupData).toHaveProperty('Cosy Family House');
    expect(propertiesLookupData['Cosy Family House']).toBe(2);
  });
});

describe('Reviews formatter function', () => {
  test('should return an array', () => {
    const dataInput = [];
    const dataOutput = true;
    const dataReturned = reviewsFormatter(dataInput);

    expect(Array.isArray(dataReturned)).toBe(dataOutput);
  });
  test('should return an array containing a single nested array, with the array elements being the objects property values', () => {
    const reviewsData = [
      {
        guest_name: 'Bob Smith',
        property_name: 'Modern Apartment in City Center',
        rating: 2,
        comment:
          'Comment about Modern Apartment in City Center: Too noisy at night, and the apartment felt cramped. Would not stay again.',
      },
    ];
    const dbPropertiesResponseData = [
      {
        property_id: 1,
        host_id: 1,
        name: 'Modern Apartment in City Center',
        location: 'London, UK',
        property_type: 'Apartment',
        price_per_night: '120',
        description: 'Description of Modern Apartment in City Center.',
      },
    ];
    const dbUsersResponseData = [
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
    const reviewsOutputData = [
      [
        1,
        2,
        2,
        'Comment about Modern Apartment in City Center: Too noisy at night, and the apartment felt cramped. Would not stay again.',
      ],
    ];

    const propertiesLookupData = propertiesLookup(dbPropertiesResponseData);
    const guestsLookupData = guestsLookup(dbUsersResponseData);
    const reviewsFormattedData = reviewsFormatter(
      reviewsData,
      propertiesLookupData,
      guestsLookupData
    );

    expect(reviewsFormattedData).toEqual(reviewsOutputData);
    expect(reviewsFormattedData[0][0]).toBe(1);
    expect(reviewsFormattedData[0][1]).toBe(2);
    expect(reviewsFormattedData[0][2]).toBe(2);
    expect(reviewsFormattedData[0][3]).toBe(
      'Comment about Modern Apartment in City Center: Too noisy at night, and the apartment felt cramped. Would not stay again.'
    );
  });
  test('should return an array containing multiple nested arrays, with the array elements being the object property values', () => {
    const reviewsData = [
      {
        guest_name: 'Frank White',
        property_name: 'Chic Studio Near the Beach',
        rating: 4,
        comment:
          'Comment about Chic Studio Near the Beach: Great location and cosy space, perfect for a beach getaway.',
      },
      {
        guest_name: 'Bob Smith',
        property_name: 'Modern Apartment in City Center',
        rating: 2,
        comment:
          'Comment about Modern Apartment in City Center: Too noisy at night, and the apartment felt cramped. Would not stay again.',
      },
    ];
    const dbPropertiesResponseData = [
      {
        property_id: 3,
        host_id: 1,
        name: 'Chic Studio Near the Beach',
        location: 'Brighton, UK',
        property_type: 'Studio',
        price_per_night: '90',
        description: 'Description of Chic Studio Near the Beach.',
      },
      {
        property_id: 1,
        host_id: 1,
        name: 'Modern Apartment in City Center',
        location: 'London, UK',
        property_type: 'Apartment',
        price_per_night: '120',
        description: 'Description of Modern Apartment in City Center.',
      },
    ];
    const dbUsersResponseData = [
      {
        user_id: 4,
        first_name: 'Frank',
        surname: 'White',
        email: 'frank@example.com',
        phone_number: '+44 7000 444444',
        is_host: false,
        avatar: 'https://example.com/images/frank.jpg',
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
    const reviewsOutputData = [
      [
        3,
        4,
        4,
        'Comment about Chic Studio Near the Beach: Great location and cosy space, perfect for a beach getaway.',
      ],
      [
        1,
        2,
        2,
        'Comment about Modern Apartment in City Center: Too noisy at night, and the apartment felt cramped. Would not stay again.',
      ],
    ];

    const propertiesLookupData = propertiesLookup(dbPropertiesResponseData);
    const guestsLookupData = guestsLookup(dbUsersResponseData);
    const reviewsFormattedData = reviewsFormatter(
      reviewsData,
      propertiesLookupData,
      guestsLookupData
    );

    expect(reviewsFormattedData).toEqual(reviewsOutputData);
    expect(reviewsFormattedData[0][0]).toBe(3);
    expect(reviewsFormattedData[0][1]).toBe(4);
    expect(reviewsFormattedData[0][2]).toBe(4);
    expect(reviewsFormattedData[0][3]).toBe(
      'Comment about Chic Studio Near the Beach: Great location and cosy space, perfect for a beach getaway.'
    );
    expect(reviewsFormattedData[1][0]).toBe(1);
    expect(reviewsFormattedData[1][1]).toBe(2);
    expect(reviewsFormattedData[1][2]).toBe(2);
    expect(reviewsFormattedData[1][3]).toBe(
      'Comment about Modern Apartment in City Center: Too noisy at night, and the apartment felt cramped. Would not stay again.'
    );
  });
});
