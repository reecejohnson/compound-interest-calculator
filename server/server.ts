import App from './src/app'
import validateEnv from './src/utlis/validateEnv'

validateEnv()

const app = new App()

app.start()
