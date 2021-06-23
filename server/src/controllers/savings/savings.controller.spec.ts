import { CalculateSavingsByMonthRequest, SavingsController } from './savings.controller';
import CalculateService from '../../services/calculate/calculate.service';
import SavingsService, { CalculateSavingsByMonth } from '../../services/savings/savings.service';
import { Response } from 'express';

describe('Savings Controller', () => {
    let savingsController: SavingsController;
    let savingsServiceMock: SavingsService;
    let mockResponse: any;
    const validRequest: CalculateSavingsByMonthRequest = {
        initialAmount: 1000,
        monthlyDeposits: 100,
        interestRate: 10,
        interestPaymentPeriod: 6,
        totalMonthsOfSaving: 1,
    };

    beforeEach(() => {
        savingsServiceMock = new SavingsService({} as CalculateService);
        savingsServiceMock.calculateSavingsByMonth = jest.fn();
        savingsController = new SavingsController(savingsServiceMock);
        mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockImplementation(() => mockResponse),
        };
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should return interest calculation result', () => {
        savingsServiceMock.calculateSavingsByMonth = jest
            .fn(savingsServiceMock.calculateSavingsByMonth)
            .mockImplementation(() => [{ month: 1, savings: 100 }]);

        const response = savingsController.calculateSavingsByMonth(
            validRequest,
            (mockResponse as unknown) as Response
        );

        expect(savingsServiceMock.calculateSavingsByMonth).toHaveBeenCalledWith(validRequest);
        expect(response).toEqual([{ month: 1, savings: 100 }]);
    });

    test('should return 422 when body is not valid', () => {
        const requestWithMissingFields = {
            totalMonthsOfSaving: 1,
        };

        savingsServiceMock.calculateSavingsByMonth = jest
            .fn(savingsServiceMock.calculateSavingsByMonth)
            .mockImplementation(() => [{ month: 1, savings: 100 }]);

        savingsController.calculateSavingsByMonth(
            requestWithMissingFields as CalculateSavingsByMonthRequest,
            (mockResponse as unknown) as Response
        );

        expect(mockResponse.status).toHaveBeenCalledWith(422);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid request' });
        expect(savingsServiceMock.calculateSavingsByMonth).not.toHaveBeenCalled();
    });

    test('should return 500 when savings service throws exception', () => {
        savingsServiceMock.calculateSavingsByMonth = jest
            .fn(savingsServiceMock.calculateSavingsByMonth)
            .mockImplementation(() => {
                throw new DOMException();
            });

        savingsController.calculateSavingsByMonth(
            validRequest as CalculateSavingsByMonthRequest,
            (mockResponse as unknown) as Response
        );

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Server error' });
    });
});
