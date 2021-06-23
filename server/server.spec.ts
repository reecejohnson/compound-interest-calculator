import request from 'supertest'
import App from './src/app'
import 'jest'

describe('Calculate API', () => {
    let app: App

    beforeAll(() => {
        app = new App()
        app.start()
    })

    test('should return calculation result', async () => {
        await request(app.getServer())
            .get('/calculate')
            .expect('Content-Type', /json/)
            .expect({ result: 103 })
            .expect(200)
    })
})
