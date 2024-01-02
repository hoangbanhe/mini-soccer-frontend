import axios from "axios";

const userURL = "http://localhost:3000/user";

export const forgotPasswordUserService = async (forgotPassword) => {
  return await axios.post(`${userURL}/forgot-password`, forgotPassword);
};

export const resetPasswordService = async (forgotPassword) => {
  return await axios.post(`${userURL}/reset-password`, forgotPassword);
};

export const updatedUserService = async (user) => {
  return await axios.put(`${userURL}/${user.id}`, user);
};
