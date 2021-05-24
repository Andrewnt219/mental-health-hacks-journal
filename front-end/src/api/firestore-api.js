import Axios from "axios";

const API_BASE_URL =
  "https://us-central1-mental-health-1bd2d.cloudfunctions.net/api";

export const fireStoreApi = Axios.create({ baseURL: API_BASE_URL });
