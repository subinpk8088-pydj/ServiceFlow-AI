import axiosInstance from "./axios";


export const getAuthHeaders = () => {

  const token = localStorage.getItem(
    "access_token"
  );

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};


export const fetchTickets = async () => {

  const response = await axiosInstance.get(
    "tickets/",
    getAuthHeaders()
  );

  return response.data;
};


export const createTicket = async (ticketData) => {

  const response = await axiosInstance.post(
    "tickets/",
    ticketData,
    getAuthHeaders()
  );

  return response.data;
};