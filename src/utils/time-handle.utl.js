import moment from "moment";

export const convertYYYYMMDDHHmmsstToVNTime = (time) => {
  return moment(time, "YYYYMMDDHHmmss").format("DD/MM/YYYY hh:mm:ss");
};
