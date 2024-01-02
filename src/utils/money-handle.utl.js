export const convertToVND = (n) => {
  return Number(n).toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
};
