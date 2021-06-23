import { Controller, Get } from 'routing-controllers'
import CalculateService from '../../services/calculate.service'
import { Service } from 'typedi'

@Service()
@Controller('/calculate')
export class CalculateController {
    private calculateService: CalculateService

    constructor(private calcService: CalculateService) {
        this.calculateService = calcService
    }

    @Get('/')
    get() {
        const result = this.calculateService.calculate()
        return {
            result,
        }
    }
}
