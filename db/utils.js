const propertyTypesFormatter = function (propertyTypesData) {
  const propertyTypes = propertyTypesData.map((property) => {
    return [property.property_type, property.description];
  });

  return propertyTypes;
};

module.exports = { propertyTypesFormatter };
