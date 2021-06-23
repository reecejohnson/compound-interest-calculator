import { CalculateController } from './calculate.controller'
import CalculateService from '../../services/calculate.service'

describe('Calculate Controller', () => {
    let calculateController: CalculateController
    let calculateServiceMock: CalculateService

    beforeAll(() => {
        calculateServiceMock = new CalculateService()
        calculateServiceMock.calculate = jest
            .fn(calculateServiceMock.calculate)
            .mockImplementation(() => 999)
        calculateController = new CalculateController(calculateServiceMock)
    })

    test('should return calculation result', () => {
        let response = calculateController.get()
        expect(calculateServiceMock.calculate).toHaveBeenCalled()
        expect(response).toEqual({ result: 999 })
    })
})
