// src/config/api.ts

const PROD_BASE = "https://academy-backend-0wdf.onrender.com/"; // Production backend

// Use Vite environment variable to switch automatically
const BASE_URL = import.meta.env.VITE_API_BASE || PROD_BASE;

// Auth Endpoints
export const AUTH_API = {
  REGISTER: `${BASE_URL}/users/register`,
  LOGIN: `${BASE_URL}/auth/login`,
};

// Trainee Endpoints
export const TRAINEE_API = {
  DASHBOARD: `${BASE_URL}/trainee/dashboard`,
  ADD_JOURNAL: `${BASE_URL}/trainee/journal`,
  UPDATE_PROFILE: `${BASE_URL}/trainee/profile`,
};

// Trainer Endpoints
export const TRAINER_API = {
  DASHBOARD: `${BASE_URL}/trainer/dashboard`,
  TRAINEES: `${BASE_URL}/trainer/trainees`,
  ACTIVATE_TRAINEE: (traineeId: string) =>
    `${BASE_URL}/trainer/activate/${traineeId}`,
  GET_JOURNALS: (traineeId: string) =>
    `${BASE_URL}/trainer/journals/${traineeId}`,
  ADD_COMMENT: (journalId: string) =>
    `${BASE_URL}/trainer/journals/${journalId}/comment`,
};
