import { useEffect, useState } from 'react'
import { ServiceResponse, ServiceResponseStatus } from '../types/serviceResponse'
import { post } from '../services/httpService'

export interface SavingsByMonth {
    month: number
    savings: number
}

export function useSavingsService(): ServiceResponse<SavingsByMonth[]> {
    const [result, setResult] = useState<ServiceResponse<SavingsByMonth[]>>({
        status: ServiceResponseStatus.LOADING,
    })
    useEffect(() => {
        post<SavingsByMonth[]>(`${process.env.REACT_APP_API_BASE_URL}/savings`, {
            initialAmount: 1000,
            monthlyDeposits: 100,
            interestRate: 10,
            interestPaymentPeriod: 6,
            totalMonthsOfSaving: 1,
        })
            .then((res: SavingsByMonth[]) =>
                setResult({ status: ServiceResponseStatus.LOADED, payload: res })
            )
            .catch((error: any) => setResult({ status: ServiceResponseStatus.ERROR, error }))
    }, [])

    return result
}
