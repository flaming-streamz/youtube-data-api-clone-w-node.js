export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: Number(process.env.PORT) || 8080,
  API_ROOT: String(process.env.API_ROOT) || "/api/v1",
};
