const propertyTypesFormatter = function (propertyTypesData) {
  const propertyTypes = propertyTypesData.map((property) => {
    return [property.property_type, property.description];
  });

  return propertyTypes;
};

const usersFormatter = function (usersData) {
  const users = usersData.map((user) => {
    return [
      user.first_name,
      user.surname,
      user.email,
      user.phone_number,
      user.role === 'host' ? true : false,
      user.avatar,
    ];
  });
  return users;
};

module.exports = { propertyTypesFormatter, usersFormatter };
