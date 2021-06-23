import { Service } from 'typedi'
import CalculateService from '../calculate/calculate.service'

export interface CalculateSavingsByMonthRequest {
    initialAmount: number
    monthlyDeposits: number
    interestRate: number
    interestPaymentPeriod: number
    totalMonthsOfSaving: number
}

interface SavingsByMonth {
    month: number
    savings: number
}

@Service()
export default class SavingsService {
    private calculateService: CalculateService

    constructor(calculateService: CalculateService) {
        this.calculateService = calculateService
    }

    public calculateSavingsByMonth({
        initialAmount,
        totalMonthsOfSaving,
        interestPaymentPeriod,
        monthlyDeposits,
        interestRate,
    }: CalculateSavingsByMonthRequest): SavingsByMonth[] {
        const savingsByMonth = []
        let amount = initialAmount
        const interestRatePerPaymentPeriod = interestRate * (interestPaymentPeriod / 12)

        for (let month = 1; month <= totalMonthsOfSaving; month++) {
            amount = this.getIncreasedAmountDependantOnInterest(
                month,
                interestPaymentPeriod,
                amount,
                monthlyDeposits,
                interestRatePerPaymentPeriod
            )

            savingsByMonth.push({
                month,
                savings: amount,
            })
        }

        return savingsByMonth
    }

    private getIncreasedAmountDependantOnInterest(
        month: number,
        interestPaymentPeriod: number,
        amount: number,
        monthlyDeposits: number,
        interestRatePerPaymentPeriod: number
    ) {
        const isInterestPayable = this.calculateService.isInterestPayable(
            month,
            interestPaymentPeriod
        )

        if (!isInterestPayable) {
            return this.calculateService.calculateSavingsIncrease(amount, monthlyDeposits)
        }

        return this.calculateService.calculateSavingsIncreaseAfterInterest(
            amount,
            monthlyDeposits,
            interestRatePerPaymentPeriod
        )
    }
}
