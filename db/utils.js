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

const usersLookup = function (users) {
  const usersAndIds = {};
  users.forEach((user) => {
    const name = `${user.first_name} ${user.surname}`;
    usersAndIds[name] = user.user_id;
  });
  return usersAndIds;
};

module.exports = {
  propertyTypesFormatter,
  usersFormatter,
  usersLookup,
};
