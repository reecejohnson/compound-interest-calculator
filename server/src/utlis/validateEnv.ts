import { cleanEnv, port, str } from 'envalid'

function validateEnv() {
    cleanEnv(process.env, {
        PORT: port(),
        APP_BASE_URL: str(),
        API_BASE_URL: str(),
    })
}

export default validateEnv
