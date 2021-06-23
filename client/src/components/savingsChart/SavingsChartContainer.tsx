import React, { useState } from 'react';
import SavingsChart from './SavingsChart';
import { ServiceResponse, ServiceResponseStatus } from '../../types/serviceResponse';
import { postSavingsService, SavingsByMonth } from '../../services/postSavingsService';
import { Box, Container, Flex, Text } from '@chakra-ui/react';
import { Form, Formik, FormikProps } from 'formik';
import NumberInput from '../numberInput';
import AutoSubmit from '../AutoFormSubmit';

export interface FormValues {
    initialAmount: number;
    monthlyDeposits: number;
    interestRate: number;
    interestPaymentPeriod: number;
    totalMonthsOfSaving: number;
}

const SavingsChartContainer = () => {
    const [result, setResult] = useState<ServiceResponse<SavingsByMonth[]>>({
        status: ServiceResponseStatus.LOADING,
    });

    async function handleSubmit(values: any) {
        const response = await postSavingsService({
            initialAmount: values.initialAmount,
            monthlyDeposits: values.monthlyDeposits,
            interestRate: values.interestRate,
            interestPaymentPeriod: values.interestPaymentPeriod,
            totalMonthsOfSaving: values.totalMonthsOfSaving,
        });
        setResult(response);
    }

    return (
        <Flex alignItems="center" bg="grey2" h="100vh">
            <Container maxW="container.xl" mt={{ base: '10px', md: '-62px' }}>
                <Box bg="white" p={12} borderRadius="lg" boxShadow="lg">
                    <Text fontSize="3xl">Compound Interest Calculator 💸</Text>
                    <Flex alignItems="center" direction={{ base: 'column', lg: 'row' }}>
                        <Box w={{ base: '100%', lg: '30%' }} id="tester">
                            <Formik<FormValues>
                                initialValues={{
                                    initialAmount: 0,
                                    monthlyDeposits: 0,
                                    interestRate: 0,
                                    interestPaymentPeriod: 0,
                                    totalMonthsOfSaving: 0,
                                }}
                                onSubmit={handleSubmit}
                            >
                                {({ values, submitForm, touched }: FormikProps<FormValues>) => {
                                    const areAllKeyTouched =
                                        Object.keys(touched).length === Object.keys(values).length;
                                    return (
                                        <>
                                            <Form>
                                                <NumberInput
                                                    inputLabel="Initial Amount"
                                                    inputName="initialAmount"
                                                />
                                                <NumberInput
                                                    inputLabel="Monthly Deposits"
                                                    inputName="monthlyDeposits"
                                                />
                                                <NumberInput
                                                    inputLabel="Interest Rate (%)"
                                                    inputName="interestRate"
                                                />
                                                <NumberInput
                                                    inputLabel="Interest Payment Period"
                                                    inputName="interestPaymentPeriod"
                                                />
                                                <NumberInput
                                                    inputLabel="Total Months of Saving"
                                                    inputName="totalMonthsOfSaving"
                                                    minimum={3}
                                                />
                                            </Form>
                                            {areAllKeyTouched && (
                                                <AutoSubmit
                                                    values={values}
                                                    submitForm={submitForm}
                                                />
                                            )}
                                        </>
                                    );
                                }}
                            </Formik>
                        </Box>
                        <Box
                            w={{ base: '100%', lg: '70%' }}
                            h="100%"
                            ml={{ base: 0, lg: 8 }}
                            mt={6}
                        >
                            <SavingsChart serviceResponse={result} />
                        </Box>
                    </Flex>
                </Box>
            </Container>
        </Flex>
    );
};

export default SavingsChartContainer;
