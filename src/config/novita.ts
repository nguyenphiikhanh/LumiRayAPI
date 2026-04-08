export const NOVITA_CONFIG = {
  BASE_URL: process.env.NOVITA_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NOVITA_API_KEY}`,
    "Content-Type": "application/json"
  }
};