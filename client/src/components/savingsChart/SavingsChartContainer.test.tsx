import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import SavingsChart from './SavingsChart';
import { postSavingsService, SavingsByMonth } from '../../services/postSavingsService';
import { ServiceResponse, ServiceResponseStatus } from '../../types/serviceResponse';
import SavingsChartContainer from './SavingsChartContainer';

jest.mock('../../services/postSavingsService', () => ({
    postSavingsService: jest.fn(),
}));

describe('SavingsChart', () => {
    const useSavingsServiceMock = postSavingsService as jest.Mock<
        Promise<ServiceResponse<SavingsByMonth[]>>
    >;

    const setup = () => {
        const utils = render(<SavingsChartContainer />);
        const initialAmountInput = utils.getByLabelText('Initial Amount');
        const monthlyDepositsInput = utils.getByLabelText('Monthly Deposits');
        const interestRateInput = utils.getByLabelText('Interest Rate (%)');
        const interestPaymentPeriodInput = utils.getByLabelText('Interest Payment Period');
        const totalMonthsSavingInput = utils.getByLabelText('Total Months of Saving');

        return {
            initialAmountInput,
            monthlyDepositsInput,
            interestRateInput,
            interestPaymentPeriodInput,
            totalMonthsSavingInput,
            ...utils,
        };
    };

    test('should render loading before chart render', () => {
        useSavingsServiceMock.mockImplementation(() =>
            Promise.resolve({
                status: ServiceResponseStatus.LOADING,
            })
        );
        const { getByText } = setup();

        expect(getByText('Loading...')).toBeInTheDocument();
    });

    test('should render error message for field that is required once field has been visited by the user', async () => {
        const { getByText, initialAmountInput } = setup();

        act(() => {
            fireEvent.blur(initialAmountInput);
        });

        await waitFor(() => {
            expect(getByText('Initial Amount is required')).toBeInTheDocument();
        }, expect.anything());
    });

    test('should render validation message for field with invalid value', async () => {
        const { getByText, initialAmountInput } = setup();

        act(() => {
            fireEvent.change(initialAmountInput, { target: { value: -1 } });
        });

        await waitFor(() => {
            expect(getByText('Initial Amount must be above 0')).toBeInTheDocument();
        }, expect.anything());
    });

    test('should render error message when all inputs are valid but service returns error', async () => {
        useSavingsServiceMock.mockImplementation(() =>
            Promise.resolve({
                status: ServiceResponseStatus.ERROR,
                error: new Error(),
            })
        );
        const {
            getByText,
            initialAmountInput,
            monthlyDepositsInput,
            interestRateInput,
            interestPaymentPeriodInput,
            totalMonthsSavingInput,
        } = setup();

        act(() => {
            fireEvent.change(initialAmountInput, { target: { value: 1 } });
            fireEvent.change(monthlyDepositsInput, { target: { value: 1 } });
            fireEvent.change(interestRateInput, { target: { value: 1 } });
            fireEvent.change(interestPaymentPeriodInput, { target: { value: 1 } });
            fireEvent.change(totalMonthsSavingInput, { target: { value: 3 } });
        });

        await waitFor(() => {
            expect(getByText('Error creating chart.')).toBeInTheDocument();
        }, expect.anything());
    });

    test('should be in loading state then render chart when all input have valid values and service call succeeds', async () => {
        useSavingsServiceMock.mockImplementation(() =>
            Promise.resolve({
                status: ServiceResponseStatus.LOADED,
                payload: [{ month: 1, savings: 100 }],
            })
        );
        const {
            getByText,
            queryByTestId,
            initialAmountInput,
            monthlyDepositsInput,
            interestRateInput,
            interestPaymentPeriodInput,
            totalMonthsSavingInput,
        } = setup();

        expect(getByText('Loading...')).toBeInTheDocument();
        expect(queryByTestId('chart')).not.toBeInTheDocument();

        act(() => {
            fireEvent.change(initialAmountInput, { target: { value: 1 } });
            fireEvent.change(monthlyDepositsInput, { target: { value: 1 } });
            fireEvent.change(interestRateInput, { target: { value: 1 } });
            fireEvent.change(interestPaymentPeriodInput, { target: { value: 1 } });
            fireEvent.change(totalMonthsSavingInput, { target: { value: 3 } });
        });

        await waitFor(() => {
            expect(queryByTestId('chart')).toBeInTheDocument();
        }, expect.anything());
    });
});
