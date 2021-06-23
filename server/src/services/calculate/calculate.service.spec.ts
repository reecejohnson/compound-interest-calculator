import CalculateService from './calculate.service'

describe('Calculate service', () => {
    let calculateService: CalculateService

    beforeAll(() => {
        calculateService = new CalculateService()
    })

    describe('calculate interest', () => {
        const cases = [
            [2, 200, 1],
            [10, 100, 10],
            [4, 400, 1],
            [10, 1000, 1],
            [1000, 10000, 10],
            [157.00000000000003, 10000, 1.57],
        ]

        test.each(cases)(
            'should return %i when amount %i and rate is %i',
            (expected: number, amount: number, rate: number) => {
                const result = calculateService.calculateInterest(amount, rate)
                expect(result).toEqual(expected)
            }
        )
    })

    describe('calculate savings increase after interest', () => {
        const cases = [
            [121, 100, 10, 10],
            [110, 100, 10, 0],
            [111.1, 100, 10, 1],
            [20200, 10000, 100, 100],
        ]

        test.each(cases)(
            'should return %i when current amount is %i, monthly savings is %i and interest rate is %i',
            (
                expected: number,
                currentAmount: number,
                monthlySavings: number,
                interestRate: number
            ) => {
                const result = calculateService.calculateSavingsIncreaseAfterInterest(
                    currentAmount,
                    monthlySavings,
                    interestRate
                )
                expect(result).toEqual(expected)
            }
        )
    })

    describe('is interest payable', () => {
        const cases = [
            [true, 10, 2],
            [false, 8, 12],
            [true, 2, 2],
        ]

        test.each(cases)(
            'should return %p when month is %i and payment period is %i',
            (expected: any, month: any, paymentPeriod: any) => {
                const result = calculateService.isInterestPayable(month, paymentPeriod)
                expect(result).toEqual(expected)
            }
        )
    })
})
