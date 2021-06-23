import { Service } from 'typedi'

@Service()
export default class CalculateService {
    public calculateInterest(amount: number, interestRate: number): number {
        return amount * (interestRate / 100)
    }

    public calculateSavingsIncreaseAfterInterest(
        currentAmount: number,
        monthlySavings: number,
        interestRate: number
    ) {
        const totalBeforeInterest = CalculateService.calculateSavingsIncrease(
            currentAmount,
            monthlySavings
        )
        const interest = this.calculateInterest(totalBeforeInterest, interestRate)
        return totalBeforeInterest + interest
    }

    private static calculateSavingsIncrease(currentAmount: number, monthlySavings: number) {
        return currentAmount + monthlySavings
    }
}
