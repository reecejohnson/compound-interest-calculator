import { ServiceResponse, ServiceResponseStatus } from '../../types/serviceResponse'
import LineChart from '../LineChart'
import React from 'react'
import { useCalculateService, CalculateResponse } from '../../hooks/useCalculateService'

const tempData = {
    xAxis: [0, 1, 2, 3, 4, 5],
    yAxis: [100, 150, 180, 210, 240, 350],
}

const SavingsChart = () => {
    const serviceResponse: ServiceResponse<CalculateResponse> = useCalculateService()

    if (serviceResponse.status === ServiceResponseStatus.LOADING) {
        return <p>Loading...</p>
    }
    if (serviceResponse.status === ServiceResponseStatus.ERROR) {
        return <p>Error creating chart.</p>
    }

    const calculationResponse: CalculateResponse = serviceResponse.payload

    return (
        <>
            <p>Calculation: {calculationResponse.result}</p>
            <LineChart
                title="Savings Over time"
                xAxisData={tempData.xAxis}
                yAxisData={tempData.yAxis}
                xLabel="Years"
                yLabel="Amount"
            />
        </>
    )
}

export default SavingsChart
