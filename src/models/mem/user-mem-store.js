import { v4 } from "uuid";

let users = [];

export const userMemStore = {
  async getAllUsers() {
    return users;
  },

  async addUser(user) {
    user._id = v4();
    users.push(user);
    return user;
  },

  async getUserById(id) {
    let foundUser = users.find((user) => user._id === id);
    if (!foundUser) {
      foundUser = null;
    }
    return foundUser;
  },

  async getUserByEmail(email) {
    let foundUser = users.find((user) => user.email === email);
    if (!foundUser) {
      foundUser = null;
    }
    return foundUser;
  },

  async deleteUserById(id) {
    const index = users.findIndex((user) => user._id === id);
    if (index !== -1) users.splice(index, 1);
  },

  async deleteAll() {
    users = [];
  },
};
