import React from 'react';
import './App.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import DefaultLayout from '../components/layouts/Default';
import theme from '../theme';
import SavingsChartContainer from '../components/savingsChart/SavingsChartContainer';

const defaultTheme = extendTheme(theme);

function App() {
    return (
        <ChakraProvider theme={defaultTheme}>
            <DefaultLayout>
                <SavingsChartContainer />
            </DefaultLayout>
        </ChakraProvider>
    );
}

export default App;
