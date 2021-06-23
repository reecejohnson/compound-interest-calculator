import { Service } from 'typedi'

@Service()
export default class CalculateService {
    public calculate(): number {
        return 103
    }
}
