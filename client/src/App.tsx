import React, { useEffect, useState } from 'react'
import './App.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import DefaultLayout from './components/layouts/Default'
import LineChart from './components/LineChart'
import theme from './theme'

const defaultTheme = extendTheme(theme)

// Note: This is just for example purposes
// should be replaced with real data from the server
const tempData = {
    xAxis: [0, 1, 2, 3, 4, 5],
    yAxis: [100, 150, 180, 210, 240, 350],
}

function App() {
    const [calculationResponse, setCalculationResponse] = useState<number>(0)

    useEffect(() => {
        fetch('http://localhost:3001/calculate')
            .then((res) => res.json())
            .then((response) => setCalculationResponse(response.result))
            .catch((err) => console.error(err))
    }, [])

    return (
        <ChakraProvider theme={defaultTheme}>
            {/* We've just bundled everything into one file here to
            get you started!*/}
            <DefaultLayout>
                <Container pt={6}>
                    Response from server: {calculationResponse}
                    <LineChart
                        title="Savings Over time"
                        xAxisData={tempData.xAxis}
                        yAxisData={tempData.yAxis}
                        xLabel="Years"
                        yLabel="Amount"
                    />
                </Container>
            </DefaultLayout>
        </ChakraProvider>
    )
}

export default App
