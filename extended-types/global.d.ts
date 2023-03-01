namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: string;
        PORT: string;
        MONGO_USERNAME: string;
        MONGO_PASSWORD: string;
        MONGO_DBNAME: string;
        PRIVATE_KEY: string
    }
}