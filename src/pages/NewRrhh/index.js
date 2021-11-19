import React from 'react';
import './NewRrhh.css';

// Components:
import RrhhForm from '../../components/RrhhForm/';
/* import {
	FormGroup,
	FormControlLabel,
	FormControl,
	TextField,
	Select,
	InputLabel,
	MenuItem,
	ListSubheader,
	Switch
} from '@mui/material';
import {LoadingButton} from '@mui/lab'; */

// Icons:
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const NewRrhh = () => {
    return (
        <div className="RrhhForm">
            <header className="header-section startFlex">
				<PersonAddIcon/>
				<h1>Nuevo Recurso Humano</h1>
			</header>
            <RrhhForm/>
        </div>
    )
};

export default NewRrhh;
