import SavingsService, { CalculateSavingsByMonth } from './savings.service';
import CalculateService from '../calculate/calculate.service';

describe('Savings service', () => {
    let savingsService: SavingsService;
    let calculateService: CalculateService;

    beforeEach(() => {
        calculateService = new CalculateService();
        calculateService.calculateSavingsIncreaseAfterInterest = jest.fn();
        calculateService.calculateSavingsIncrease = jest.fn();
        calculateService.isInterestPayable = jest.fn();
        calculateService.calculateInterest = jest.fn();
        savingsService = new SavingsService(calculateService);
    });

    test('calculate savings for 1 month with interest', () => {
        calculateService.isInterestPayable = jest.fn().mockImplementation(() => true);

        const calculateSavingsByMonthRequest: CalculateSavingsByMonth = {
            initialAmount: 1000,
            monthlyDeposits: 100,
            interestRate: 10,
            interestPaymentPeriod: 6,
            totalMonthsOfSaving: 1,
        };

        savingsService.calculateSavingsByMonth(calculateSavingsByMonthRequest);

        expect(calculateService.isInterestPayable).toHaveBeenCalledTimes(1);
        expect(calculateService.isInterestPayable).toHaveBeenCalledWith(
            1,
            calculateSavingsByMonthRequest.interestPaymentPeriod
        );
        expect(calculateService.calculateSavingsIncreaseAfterInterest).toHaveBeenCalledTimes(1);
        expect(
            calculateService.calculateSavingsIncreaseAfterInterest(
                calculateSavingsByMonthRequest.initialAmount,
                calculateSavingsByMonthRequest.monthlyDeposits,
                calculateSavingsByMonthRequest.interestRate
            )
        );
        expect(calculateService.calculateSavingsIncrease).not.toHaveBeenCalled();
    });

    test('calculate savings for 1 no interest', () => {
        calculateService.isInterestPayable = jest.fn().mockImplementation(() => false);

        const calculateSavingsByMonthRequest: CalculateSavingsByMonth = {
            initialAmount: 1000,
            monthlyDeposits: 100,
            interestRate: 10,
            interestPaymentPeriod: 6,
            totalMonthsOfSaving: 1,
        };

        savingsService.calculateSavingsByMonth(calculateSavingsByMonthRequest);

        expect(calculateService.isInterestPayable).toHaveBeenCalledTimes(1);
        expect(calculateService.calculateSavingsIncrease).toHaveBeenCalledTimes(1);
        expect(calculateService.calculateSavingsIncrease).toHaveBeenCalledWith(
            calculateSavingsByMonthRequest.initialAmount,
            calculateSavingsByMonthRequest.monthlyDeposits
        );
        expect(calculateService.calculateSavingsIncreaseAfterInterest).not.toHaveBeenCalled();
    });

    test('calculate savings for 12 months', () => {
        calculateService.isInterestPayable = jest.fn().mockImplementation(() => true);

        const calculateSavingsByMonthRequest: CalculateSavingsByMonth = {
            initialAmount: 1000,
            monthlyDeposits: 100,
            interestRate: 10,
            interestPaymentPeriod: 12,
            totalMonthsOfSaving: 12,
        };

        savingsService.calculateSavingsByMonth(calculateSavingsByMonthRequest);

        expect(calculateService.isInterestPayable).toHaveBeenCalledTimes(12);
        expect(calculateService.calculateSavingsIncreaseAfterInterest).toHaveBeenCalledTimes(12);
    });
});
