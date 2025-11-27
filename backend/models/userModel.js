import db from "../config/db.js";

export const create = (userData, callback) => {
  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(query, [userData.name, userData.email, userData.password], callback);
};

export const findByEmail = (email, callback) => {
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], callback);
};
