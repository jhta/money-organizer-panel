const ENV = {
  API_KEY: import.meta.env.VITE_API_KEY as string,
  AUTH_DOMAIN: import.meta.env.VITE_AUTH_DOMAIN as string,
  PROJECT_ID: import.meta.env.VITE_PROJECT_ID as string,
  STORAGE_BUCKET: import.meta.env.VITE_STORAGE_BUCKET as string,
  MESSAGING_SENDER_ID: import.meta.env.VITE_MESSAGING_SENDER_ID as string,
  APP_ID: import.meta.env.VITE_APP_ID as string,
  MEASUREMENT_ID: import.meta.env.VITE_MEASUREMENT_ID as string,
};

export default ENV;
