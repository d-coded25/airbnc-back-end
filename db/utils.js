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

const propertiesFormatter = function (propertiesData, usersAndIds) {
  const properties = propertiesData.map((property) => {
    return [
      usersAndIds[property.host_name],
      property.name,
      property.location,
      property.property_type,
      property.price_per_night,
      property.description,
    ];
  });
  return properties;
};

const guestsLookup = function (users) {
  const guestsAndIds = {};
  users.forEach((user) => {
    if (!user.is_host) {
      const name = `${user.first_name} ${user.surname}`;
      guestsAndIds[name] = user.user_id;
    }
  });
  return guestsAndIds;
};

const propertiesLookup = function (properties) {
  const propertiesAndIds = {};
  properties.forEach((property) => {
    const propertyName = property.name;
    propertiesAndIds[propertyName] = property.property_id;
  });
  return propertiesAndIds;
};

module.exports = {
  propertyTypesFormatter,
  usersFormatter,
  usersLookup,
  propertiesFormatter,
  guestsLookup,
  propertiesLookup,
};
