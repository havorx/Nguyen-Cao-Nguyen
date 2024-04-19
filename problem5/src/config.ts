export const appConfiguration = {
  postgres: {
    connectionString: process.env.CRUDE_APP_POSTGRES_DB_CONNECTION_STRING ?? '',
  },
} as const;
