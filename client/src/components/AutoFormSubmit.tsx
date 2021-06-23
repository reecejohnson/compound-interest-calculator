import { useEffect } from 'react';
import { FormValues } from './savingsChart/SavingsChartContainer';

interface AutoSubmitProps {
    values: FormValues;
    submitForm: () => void;
}

const AutoSubmit = ({ values, submitForm }: AutoSubmitProps) => {
    useEffect(() => {
        submitForm();
    }, [values, submitForm]);

    return null;
};

export default AutoSubmit;
