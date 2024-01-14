import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

interface Props {
    name: string;
    label: string;
    options: Array<string | number>
}


const DropDown: React.FC<Props> = (props) => {
    const { name, label, options } = props;

    const methods = useFormContext();
    const { control } = methods;

    return (
        <Controller
            name={name}
            control={control}
            render={({
                field,
            }) => (
                <FormControl size='small'>
                    <InputLabel>{label}</InputLabel>
                    <Select
                        label={label}
                        {...field}
                    >
                        {options.map((option) => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        />
    )
}

export default DropDown