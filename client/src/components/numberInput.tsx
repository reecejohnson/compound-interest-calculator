import { Field, FieldProps } from 'formik';
import {
    FormControl,
    FormLabel,
    NumberInput as CharkaNumberInput,
    NumberInputField,
    Text,
} from '@chakra-ui/react';
import React from 'react';

interface Props {
    inputName: string;
    inputLabel: string;
    minimum?: number;
}

const NumberInput = ({ inputName, inputLabel, minimum = 0 }: Props) => {
    function validateNumber(value: number) {
        let error;
        if (!value) {
            error = `${inputLabel} is required`;
        } else if (value < minimum) {
            error = `${inputLabel} must be above ${minimum}`;
        }
        return error;
    }

    return (
        <Field name={inputName} validate={validateNumber} type="number">
            {({ field, form }: FieldProps) => {
                const isInvalid = !!form.errors[inputName] && !!form.touched[inputName];
                return (
                    <FormControl id={inputName} mt={6}>
                        <FormLabel>{inputLabel}</FormLabel>
                        <CharkaNumberInput
                            id={inputName}
                            defaultValue={undefined}
                            clampValueOnBlur={false}
                            isInvalid={isInvalid}
                        >
                            <NumberInputField
                                id={inputName}
                                {...field}
                                min={minimum}
                                onChange={(event) => {
                                    form.setFieldTouched(inputName);
                                    form.setFieldValue(inputName, parseInt(event.target.value));
                                }}
                            />
                        </CharkaNumberInput>
                        {isInvalid && (
                            <Text color="danger" mt={1}>
                                {form.errors[inputName]}
                            </Text>
                        )}
                    </FormControl>
                );
            }}
        </Field>
    );
};

export default NumberInput;
