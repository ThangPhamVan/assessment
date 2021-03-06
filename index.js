/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => "hello world";

/**
 *
 * @param {array} privateProperties
 * @param {array} rawData
 * @returns {array} array of objects with private properties removed
 */

exports.stripPrivateProperties = (privateProperties, rawData) => {
  return rawData.map((data) => {
    privateProperties.forEach((property) => {
      if (data.hasOwnProperty(property)) {
        delete data[property];
      }
    });
    return data;
  });
};

/**
 *
 * @param {string} dynamicKey - key to be used to filter data
 * @param {array} rawData - array of objects
 * @returns {array} - array of objects with dynamicKey removed
 */

exports.excludeByProperty = (dynamicKey, rawData) =>
  rawData.filter((data) => !data[dynamicKey]);
/**
 *
 * @param {array} rawData - array of objects
 * @returns {array} sum of objects field values in rawData
 */
exports.sumDeep = (rawData) => {
  return rawData.map(({ objects }) => ({
    objects: objects.reduce((acc, { val }) => acc + val, 0),
  }));
};
/**
 *
 * @param {array} colors - array of colors
 * @param {array} statuses - array of status
 * @returns {array} - array of objects with color and status
 */
exports.applyStatusColor = (colors, statuses) => {
  const listColor = new Object();
  for (const [color, status] of Object.entries(colors)) {
    status.forEach((el) => {
      listColor[el] = color;
    });
  }
  return statuses.reduce((result, { status }) => {
    return listColor.hasOwnProperty(status)
      ? result.concat({
          status,
          color: listColor[status],
        })
      : result;
  }, []);
};
/**
 *
 * @param {function} fnc - function to be called
 * @param {string} message - message to be displayed
 * @returns {function} 
 */
exports.createGreeting = (fnc, message) => (userName) => fnc(message, userName);

/**
 *
 * @param {object} defaultProperties - default properties to be added to the object
 * @returns {object} - object with default properties
 */
exports.setDefaults =
  (defaultProperties = {}) =>
  (data = {}) => ({
    ...defaultProperties,
    ...data,
  });
/**
 *
 * @param {string} userName
 * @param {object} services - object with services {fetchCompanyById: function,
 *  fetchStatus: function, fetchUsers: function}
 * @returns {object} - object with company, status and users
 */
exports.fetchUserByNameAndUsersCompany = async (userName, services) => {
  try {
    const { fetchCompanyById, fetchStatus, fetchUsers } = services;
    const [users, currentStatus] = await Promise.all([
      fetchUsers(),
      fetchStatus(),
    ]);
    const foundCurrentUser = users.find(({ name }) => name === userName);
    const company = await fetchCompanyById(foundCurrentUser.companyId);
    return {
      company,
      status: currentStatus,
      user: foundCurrentUser,
    };
  } catch (error) {
    throw error;
  }
};
