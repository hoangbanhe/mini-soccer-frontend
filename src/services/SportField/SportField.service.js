import axios from "axios";

const sportFieldURL = "http://localhost:3000/admin";

export const getAllSportFieldService = async (params) => {
  return await axios.get(`${sportFieldURL}`, {
    params,
  });
};

export const getAllSportFieldPagination = async (params) => {
  return await axios.get(`${sportFieldURL}/pagination`, {
    params,
  });
};

export const updateSportFieldService = async (
  currentSportField,
  modalSportField
) => {
  return await axios.put(
    `${sportFieldURL}/${currentSportField.id}`,
    modalSportField
  );
};

export const createSportFieldService = async (createSportField) => {
  // const token = localStorage.getItem("token");
  return await axios.post(`${sportFieldURL}/create`, createSportField);
};

export const getOneSportFieldService = async (sportFieldId, bokingDay) => {
  return await axios.get(`${sportFieldURL}/${sportFieldId}`, {
    params: {
      bokingDay,
    },
  });
};

export const editSportFieldService = async (sportFieldId) => {
  return await axios.get(`${sportFieldURL}/${sportFieldId}`);
};

export const deleteSportFieldService = async (sportFieldId) => {
  return await axios.delete(`${sportFieldURL}/${sportFieldId}`);
};
