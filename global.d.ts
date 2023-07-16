declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL: string;
            FRONTEND_HOST_NAME: string;
            FRONTEND_PORT: string;
            FRONTEND_PROTOCOL: "http://" | "https://";
            SESSION_SECRET: string;
            TEST_USER_PASSWORD: string;
            TEST_USERNAME: string;
        }
    }
}
export { };