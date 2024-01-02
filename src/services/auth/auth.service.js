import axios from "axios";

export const signIn = async (email, password) => {
  return axios.post(`http://localhost:3000/user/sign-in`, {
    email,
    password,
  });
};

export const signUp = async (signUpPayLoad) => {
  return axios.post(`http://localhost:3000/user/sign-up`, signUpPayLoad);
};

export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`http://localhost:3000/user/get-profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
