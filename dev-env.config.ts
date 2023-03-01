import {config} from 'dotenv'

config()

const _ = process.env

export default {
    port: _.PORT ?? '',
    token_key: _.PRIVATE_KEY,
    db_username: _.DB_USERNAME,
    db_password: _.MONGO_PASSWORD,
    db_name: _.MONGO_DBNAME
}