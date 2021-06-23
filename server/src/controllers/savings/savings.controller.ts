import { Body, Controller, Get, Post, Res } from 'routing-controllers';
import { Response } from 'express';
import { Service } from 'typedi';
import SavingsService from '../../services/savings/savings.service';

export interface CalculateSavingsByMonthRequest {
    initialAmount: number;
    monthlyDeposits: number;
    interestRate: number;
    interestPaymentPeriod: number;
    totalMonthsOfSaving: number;
}

@Service()
@Controller('/savings')
export class SavingsController {
    private _savingsService: SavingsService;

    constructor(private savingsService: SavingsService) {
        this._savingsService = savingsService;
    }

    @Post('/')
    calculateSavingsByMonth(
        @Body() body: CalculateSavingsByMonthRequest,
        @Res() response: Response
    ) {
        try {
            const isBodyValid = this.isBodyValid(body);

            if (!isBodyValid) {
                return response.status(422).json({ error: 'Invalid request' });
            }

            return this._savingsService.calculateSavingsByMonth(body);
        } catch (e) {
            return response.status(500).json({ error: 'Server error' });
        }
    }

    private isBodyValid(calculateSavingsByMonthRequest: CalculateSavingsByMonthRequest) {
        return (
            calculateSavingsByMonthRequest.monthlyDeposits &&
            calculateSavingsByMonthRequest.initialAmount &&
            calculateSavingsByMonthRequest.interestPaymentPeriod &&
            calculateSavingsByMonthRequest.totalMonthsOfSaving
        );
    }
}
