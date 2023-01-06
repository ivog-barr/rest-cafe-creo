const Role = require("../models/role");
const User = require('../models/user');

const isRoleValid = async (role = "") => {
  const existeRol = await Role.findOne({ role });
  if (!existeRol) {
    throw new Error(`El rol ${role} no esta en la BDD`);
  }
};

const emailExist = async (mail = '') => {
  const existeEmail = await User.findOne({ mail });
  if (existeEmail) {
    throw new Error (`El correo ${mail} ya esta registrado`);
  }
};


const existeUsuarioId  = async (id ) => {
    const existeUsuarioId = await User.findById(id);
    if (!existeUsuarioId) {
      throw new Error (`El id ${id} no existe`);
    }
  };

module.exports = {
  isRoleValid,
  emailExist,
  existeUsuarioId
};
