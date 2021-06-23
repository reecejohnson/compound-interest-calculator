import { useEffect, useState } from 'react'
import { ServiceResponse, ServiceResponseStatus } from '../types/serviceResponse'
import { http } from '../services/httpService'

export interface CalculateResponse {
    result: number
}

export function useCalculateService(): ServiceResponse<CalculateResponse> {
    const [result, setResult] = useState<ServiceResponse<CalculateResponse>>({
        status: ServiceResponseStatus.LOADING,
    })
    useEffect(() => {
        http<CalculateResponse>(`${process.env.REACT_APP_API_BASE_URL}/calculate`)
            .then((res) => setResult({ status: ServiceResponseStatus.LOADED, payload: res }))
            .catch((error) => setResult({ status: ServiceResponseStatus.ERROR, error }))
    }, [])

    return result
}
