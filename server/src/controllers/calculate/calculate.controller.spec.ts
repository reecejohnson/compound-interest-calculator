import { CalculateController } from './calculate.controller'
import CalculateService from '../../services/calculate/calculate.service'

describe('Calculate Controller', () => {
    let calculateController: CalculateController
    let calculateServiceMock: CalculateService

    beforeAll(() => {
        calculateServiceMock = new CalculateService()
        calculateServiceMock.calculateInterest = jest.fn()
        calculateServiceMock.calculateSavingsIncreaseAfterInterest = jest.fn()
        calculateController = new CalculateController(calculateServiceMock)
    })

    afterEach(() => {
        jest.resetAllMocks()
    })

    test('should return interest calculation result', () => {
        calculateServiceMock.calculateInterest = jest
            .fn(calculateServiceMock.calculateInterest)
            .mockImplementation(() => 999)

        const response = calculateController.get()

        expect(calculateServiceMock.calculateInterest).toHaveBeenCalled()
        expect(response).toEqual({ result: 999 })
    })
})
