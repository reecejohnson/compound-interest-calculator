import React from 'react'
import './App.css'
import { ChakraProvider, Container, extendTheme } from '@chakra-ui/react'
import DefaultLayout from './components/layouts/Default'
import theme from './theme'
import SavingsChart from './components/savingsChart/SavingsChart'

const defaultTheme = extendTheme(theme)

function App() {
    return (
        <ChakraProvider theme={defaultTheme}>
            <DefaultLayout>
                <Container pt={6}>
                    <SavingsChart />
                </Container>
            </DefaultLayout>
        </ChakraProvider>
    )
}

export default App
