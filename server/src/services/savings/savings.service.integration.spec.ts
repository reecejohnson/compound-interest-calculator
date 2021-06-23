import SavingsService, { CalculateSavingsByMonth } from './savings.service';
import CalculateService from '../calculate/calculate.service';

describe('Savings service', () => {
    let savingsService: SavingsService;
    let calculateService: CalculateService;

    beforeAll(() => {
        calculateService = new CalculateService();
        savingsService = new SavingsService(calculateService);
    });

    test('calculate savings for 1 month', () => {
        const calculateSavingsByMonthRequest: CalculateSavingsByMonth = {
            initialAmount: 1000,
            monthlyDeposits: 100,
            interestRate: 10,
            interestPaymentPeriod: 6,
            totalMonthsOfSaving: 1,
        };

        const result = savingsService.calculateSavingsByMonth(calculateSavingsByMonthRequest);

        const expected = [{ month: 1, savings: 1100 }];

        expect(result).toEqual(expected);
    });

    test('calculate savings for 3 months', () => {
        const calculateSavingsByMonthRequest: CalculateSavingsByMonth = {
            initialAmount: 200,
            monthlyDeposits: 20,
            interestRate: 5,
            interestPaymentPeriod: 3,
            totalMonthsOfSaving: 3,
        };

        const result = savingsService.calculateSavingsByMonth(calculateSavingsByMonthRequest);

        const expected = [
            { month: 1, savings: 220 },
            { month: 2, savings: 240 },
            { month: 3, savings: 263.25 },
        ];

        expect(result).toEqual(expected);
    });

    test('calculate savings for 12 months', () => {
        const calculateSavingsByMonthRequest: CalculateSavingsByMonth = {
            initialAmount: 1000,
            monthlyDeposits: 110,
            interestRate: 5,
            interestPaymentPeriod: 12,
            totalMonthsOfSaving: 12,
        };

        const result = savingsService.calculateSavingsByMonth(calculateSavingsByMonthRequest);

        const expected = [
            { month: 1, savings: 1110 },
            { month: 2, savings: 1220 },
            { month: 3, savings: 1330 },
            { month: 4, savings: 1440 },
            { month: 5, savings: 1550 },
            { month: 6, savings: 1660 },
            { month: 7, savings: 1770 },
            { month: 8, savings: 1880 },
            { month: 9, savings: 1990 },
            { month: 10, savings: 2100 },
            { month: 11, savings: 2210 },
            { month: 12, savings: 2436 },
        ];

        expect(result).toEqual(expected);
    });
});
