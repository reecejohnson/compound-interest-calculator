import LineChart from '../LineChart';
import React from 'react';
import { SavingsByMonth } from '../../services/postSavingsService';
import { ServiceResponse, ServiceResponseStatus } from '../../types/serviceResponse';
import { Flex, Spinner, Text } from '@chakra-ui/react';

interface Props {
    serviceResponse: ServiceResponse<SavingsByMonth[]>;
}

const SavingsChart = ({ serviceResponse }: Props) => {
    if (serviceResponse.status === ServiceResponseStatus.LOADING) {
        return (
            <Flex direction="column" justifyContent="center" alignItems="center">
                <Text mb={8}>Input all required data to load the graph</Text>
                <Spinner color="blue.500" size="xl" />
            </Flex>
        );
    }
    if (serviceResponse.status === ServiceResponseStatus.ERROR) {
        return <p>Error creating chart.</p>;
    }
    if (serviceResponse.payload.length < 0) {
        return <p>No chart.</p>;
    }

    const savingsByMonth = serviceResponse.payload;

    const months = savingsByMonth.map((monthlySavings, i) => i + 1);
    const savingsPerMonth = savingsByMonth.map((monthlySavings, i) => monthlySavings.savings);

    return (
        <div data-testid="chart">
            <LineChart
                title="Savings Over time"
                xAxisData={months}
                yAxisData={savingsPerMonth}
                xLabel="Months"
                yLabel="Amount"
            />
        </div>
    );
};

export default SavingsChart;
