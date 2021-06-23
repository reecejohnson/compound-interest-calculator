import { Service } from 'typedi';

@Service()
export default class CalculateService {
    public calculateInterest(amount: number, interestRate: number): number {
        return amount * (interestRate / 100);
    }

    public calculateSavingsIncreaseAfterInterest(
        currentAmount: number,
        monthlySavings: number,
        interestRate: number
    ) {
        const totalBeforeInterest = this.calculateSavingsIncrease(currentAmount, monthlySavings);
        const interest = this.calculateInterest(totalBeforeInterest, interestRate);
        return totalBeforeInterest + interest;
    }

    public isInterestPayable(month: number, paymentPeriod: number) {
        return month % paymentPeriod === 0;
    }

    public calculateSavingsIncrease(currentAmount: number, monthlySavings: number) {
        return currentAmount + monthlySavings;
    }
}
