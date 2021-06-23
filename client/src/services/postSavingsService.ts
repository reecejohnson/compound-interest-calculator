import { ServiceResponse, ServiceResponseStatus } from '../types/serviceResponse';
import { post } from './httpService';

export interface SavingsByMonth {
    month: number;
    savings: number;
}

interface Props {
    initialAmount: number;
    monthlyDeposits: number;
    interestRate: number;
    interestPaymentPeriod: number;
    totalMonthsOfSaving: number;
}

export async function postSavingsService({
    initialAmount,
    monthlyDeposits,
    interestRate,
    interestPaymentPeriod,
    totalMonthsOfSaving,
}: Props): Promise<ServiceResponse<SavingsByMonth[]>> {
    try {
        const response = await post<SavingsByMonth[]>(
            `${process.env.REACT_APP_API_BASE_URL}/savings`,
            {
                initialAmount,
                monthlyDeposits,
                interestRate,
                interestPaymentPeriod,
                totalMonthsOfSaving,
            }
        );

        if (response.status === 200) {
            return { status: ServiceResponseStatus.LOADED, payload: response.body };
        } else {
            return { status: ServiceResponseStatus.ERROR, error: new Error() };
        }
    } catch (error) {
        return { status: ServiceResponseStatus.ERROR, error };
    }
}
