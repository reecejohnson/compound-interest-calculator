import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders calculation result', () => {
    render(<App />)
    const linkElement = screen.getByText(/103/i)
    expect(linkElement).toBeInTheDocument()
})
