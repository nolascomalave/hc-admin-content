import React, { useEfect } from 'react';

// Components:
import {
	FormControl,
	TextField,
	Select,
	InputLabel,
	MenuItem
} from '@mui/material';

const SelectList = ({style, variant, required, id, ...rest, /* error, name, defaultValue, onChange, value */}) => {
    let options=null;

    return (
        <FormControl
            style={{display:`${form.registered_management ? 'none' : ''}`}}
            variant="standard"
            required={!form.registered_management}
        >
            <InputLabel htmlFor="management-input">Gerencia</InputLabel>
            <Select id="management-input" {...rest} >
                {options && options.map((el. i)=>(
                    <MenuItem value='principal'>Hi Connection</MenuItem>
                ))}
                <MenuItem value='principal'>Hi Connection</MenuItem>
            </Select>
        </FormControl>
    )
}

export default SelectList
