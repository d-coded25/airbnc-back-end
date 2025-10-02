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

const usersLookup = function (usersData) {
  const usersAndIds = {};
  usersData.forEach((user) => {
    const name = `${user.first_name} ${user.surname}`;
    usersAndIds[name] = user.user_id;
  });
  return usersAndIds;
};

const propertiesFormatter = function (propertiesData, usersAndIdsData) {
  const properties = propertiesData.map((property) => {
    return [
      usersAndIdsData[property.host_name],
      property.name,
      property.location,
      property.property_type,
      property.price_per_night,
      property.description,
    ];
  });
  return properties;
};

const guestsLookup = function (usersData) {
  const guestsAndIds = {};
  usersData.forEach((user) => {
    if (!user.is_host) {
      const name = `${user.first_name} ${user.surname}`;
      guestsAndIds[name] = user.user_id;
    }
  });
  return guestsAndIds;
};

const propertiesLookup = function (propertiesData) {
  const propertiesAndIds = {};
  propertiesData.forEach((property) => {
    const propertyName = property.name;
    propertiesAndIds[propertyName] = property.property_id;
  });
  return propertiesAndIds;
};

const reviewsFormatter = function (reviewsData, propertiesData, guestsData) {
  const reviews = reviewsData.map((review) => {
    return [
      propertiesData[review.property_name],
      guestsData[review.guest_name],
      review.rating,
      review.comment,
    ];
  });

  return reviews;
};

const imagesFormatter = function (imagesData, propertiesData) {
  const images = imagesData.map((image) => {
    return [
      propertiesData[image.property_name],
      image.image_url,
      image.alt_tag,
    ];
  });
  return images;
};

module.exports = {
  propertyTypesFormatter,
  usersFormatter,
  usersLookup,
  propertiesFormatter,
  guestsLookup,
  propertiesLookup,
  reviewsFormatter,
  imagesFormatter,
};
