import 'jest';
import request from 'supertest';
import App from '../../app';

describe('Savings API', () => {
    let app: App;
    let server: any;
    const savingsApiPath = '/savings';

    beforeAll(() => {
        app = new App();
        server = app.start();
    });

    afterAll(async () => {
        await server.close();
    });

    test('should return savings by month', async () => {
        const requestBody = {
            initialAmount: 1000,
            monthlyDeposits: 100,
            interestRate: 10,
            interestPaymentPeriod: 6,
            totalMonthsOfSaving: 1,
        };
        await request(app.getServer())
            .post(savingsApiPath)
            .send(requestBody)
            .expect('Content-Type', /json/)
            .expect([{ month: 1, savings: 1100 }])
            .expect(200);
    });

    test('should return 422 when invalid body', async () => {
        const invalidRequestBody = {
            invalid: 'body',
        };
        await request(app.getServer())
            .post(savingsApiPath)
            .send(invalidRequestBody)
            .expect('Content-Type', /json/)
            .expect({ error: 'Invalid request' })
            .expect(422);
    });
});
