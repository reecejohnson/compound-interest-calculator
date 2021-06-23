import React from 'react';
import { render } from '@testing-library/react';
import SavingsChart from './SavingsChart';
import { SavingsByMonth, useSavingsService } from '../../hooks/useSavingsService';
import { ServiceResponse, ServiceResponseStatus } from '../../types/serviceResponse';

jest.mock('../../hooks/useSavingsService', () => ({
    useSavingsService: jest.fn(),
}));

describe('SavingsChart', () => {
    const useSavingsServiceMock = useSavingsService as jest.Mock<ServiceResponse<SavingsByMonth[]>>;

    test('should render loading as service hook is loading', () => {
        useSavingsServiceMock.mockImplementation(() => ({
            status: ServiceResponseStatus.LOADING,
        }));
        const { getByText } = render(<SavingsChart />);
        expect(getByText('Loading...')).toBeInTheDocument();
    });
    test('should render error message when service hook returns error', () => {
        useSavingsServiceMock.mockImplementation(() => ({
            status: ServiceResponseStatus.ERROR,
            error: new Error(),
        }));
        const { getByText } = render(<SavingsChart />);
        expect(getByText('Error creating chart.')).toBeInTheDocument();
    });
    test('should render chart when service call succeeds', () => {
        useSavingsServiceMock.mockImplementation(() => ({
            status: ServiceResponseStatus.LOADED,
            payload: [{ month: 1, savings: 100 }],
        }));
        const { getByText } = render(<SavingsChart />);
        expect(getByText('Calculation: 100')).toBeInTheDocument();
    });
});
