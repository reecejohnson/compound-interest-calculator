import React from 'react'
import { render } from '@testing-library/react'
import SavingsChart from './SavingsChart'
import { CalculateResponse, useCalculateService } from '../../hooks/useCalculateService'
import { ServiceResponse, ServiceResponseStatus } from '../../types/serviceResponse'

jest.mock('../../hooks/useCalculateService', () => ({
    useCalculateService: jest.fn(),
}))

describe('SavingsChart', () => {
    const useCalculateServiceMock = useCalculateService as jest.Mock<
        ServiceResponse<CalculateResponse>
    >

    test('should render loading as service hook is loading', () => {
        useCalculateServiceMock.mockImplementation(() => ({
            status: ServiceResponseStatus.LOADING,
        }))
        const { getByText } = render(<SavingsChart />)
        expect(getByText('Loading...')).toBeInTheDocument()
    })
    test('should render error message when service hook returns error', () => {
        useCalculateServiceMock.mockImplementation(() => ({
            status: ServiceResponseStatus.ERROR,
            error: new Error(),
        }))
        const { getByText } = render(<SavingsChart />)
        expect(getByText('Error creating chart.')).toBeInTheDocument()
    })
    test('should render chart when service call succeeds', () => {
        useCalculateServiceMock.mockImplementation(() => ({
            status: ServiceResponseStatus.LOADED,
            payload: { result: 832 },
        }))
        const { getByText } = render(<SavingsChart />)
        expect(getByText('Calculation: 832')).toBeInTheDocument()
    })
})
