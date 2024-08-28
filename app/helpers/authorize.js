const response = require('./apiResponse');
const User = require('../models/mst_users_model');
const Role = require('../models/mst_roles_model');

module.exports.permit = (permissions) => {
  return async (req, res, next) => {
    const roles = permissions;

    if (!roles) return next();

    try {
      // Find the user by their ID
      const findUser = await User.findById(req.user.id).populate('role_id');

      if (!findUser) {
        return response.forbiddenResponse(res, 'User not found');
      }

      // Find the role associated with the user
      const findRole = findUser.role_id;

      if (!findRole) {
        return response.forbiddenResponse(res, 'Role not found for the user');
      }

      // Check if the role name is in the list of allowed permissions
      if (roles.includes(findRole.name)) {
        return next();
      }

      response.forbiddenResponse(res, 'You have no access to this service');
    } catch (error) {
      response.serverErrorResponse(res, error.message);
    }
  };
};
