import React, { } from 'react';

// Components:
import {
	FormControl,
	TextField,
	Select,
	InputLabel,
	MenuItem,
	ListSubheader
} from '@mui/material';
import {LoadingButton} from '@mui/lab';

// Icons:
import SaveIcon from '@mui/icons-material/Save';

// Hooks:
import { useForm } from '../../hooks/useForm';

// Helpers:
const {
	extractNumberInText,
	onlyName,
	toUpper,
	puntoDigito,
	firstCharName,
	validateName,
    validateCi,
    validateRif,
    validateBirthYears,
    validateAdmissionDate,
	validateSimpleText
} = require('../../helpers/helpGlobalFunctions');


// Constants:
const initialForm={
	first_name:'',
	second_name:'',
	first_last_name:'',
	second_last_name:'',
	birth:'',
	type_document:'V',
	document: '',
	rif: '',
	admission:'',
	extension: '',
	management: '',
	department:'',
	jop_position: ''
}, validateForm=(form, errors)=>{
	let errs={}, asignError=(name, error)=>{
		if(error){
			errs[name]=error;
		}else if(form[name]){
			delete form[name];
		}
	};

	asignError('first_name', validateName(form.first_name, 'nombre', true));
	asignError('second_name', validateName(form.second_name, 'nombre'));
	asignError('first_last_name', validateName(form.first_last_name, 'apellido', true));
	asignError('second_last_name', validateName(form.second_last_name, 'apellido'));

	if(form.type_document==='V' || form.type_document==='E'){
		asignError('document', validateCi(form.document, 7, 9, true));
	}else{}

	if(form.rif!='' && form.rif!=null){
		asignError('rif', validateRif(form.type_document.concat(form.rif)));
	}

	asignError('birth', validateBirthYears(form.birth, 18, 120, true));
	asignError('admission', validateAdmissionDate(form.admission, 0, 5, true));

	return errs;
};

const RrhhForm = () => {
    const {
        errors,
        setErrors,
        form,
        loading,
        handleChange
    } = useForm(initialForm);

	const handleSubmit=(e)=>{
		e.preventDefault();
		setErrors(validateForm(form, errors));
	};

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="fieldset">
				<h2 className="fieldset__title">
					<span className="fieldset__title__text">Datos Personales</span>
				</h2>

				<div className="fieldset__content">
					<div className="input-container">
						<TextField
							error={errors.first_name ? true : false}
							
							name='first_name'
							label="Primer Nombre"
							helperText={errors.first_name}
							value={form.first_name}
							variant="standard"
							onChange={e => handleChange(e, onlyName)}
						/>
					</div>

					<div className="input-container">
						<TextField
							error={errors.second_name ? true : false}
							name='second_name'
							label="Segundo Nombre"
							helperText={errors.second_name}
							value={form.second_name}
							variant="standard"
							onChange={e => handleChange(e, onlyName)}
						/>
					</div>

					<div className="input-container">
						<TextField
							error={errors.first_last_name ? true : false}
							
							name='first_last_name'
							label="Primer Apellido"
							helperText={errors.first_last_name}
							value={form.first_last_name}
							variant="standard"
							onChange={e => handleChange(e, onlyName)}
						/>
					</div>

					<div className="input-container">
						<TextField
							error={errors.second_last_name ? true : false}
							name='second_last_name'
							label="Segundo Apellido"
							helperText={errors.second_last_name}
							value={form.second_last_name}
							variant="standard"
							onChange={e => handleChange(e, onlyName)}
						/>
					</div>

					<div className="input-container">
						<TextField
							
							type='date'
							error={errors.birth ? true : false}
							name='birth'
							label="Nacimiento"
							variant="standard"
							helperText={errors.birth}
							onChange={handleChange}
							InputLabelProps={{
								shrink: true,
							}}
							value={form.birth}
						/>
					</div>

					<div className="input-container">
						<FormControl
							variant="standard"
							
						>
							<InputLabel htmlFor="type-document-input">Tipo de Documento</InputLabel>
							<Select
								id="type-document-input"
								error={errors.type_document ? true : false}
								name='type_document'
								defaultValue='V'
								value={form.type_document}
								label="Tipo de Documento"
								onChange={e => handleChange(e)}
							>
								<ListSubheader>Cédula:</ListSubheader>
								<MenuItem value='V'>Cédula - V</MenuItem>
								<MenuItem value='E'>Cédula - E</MenuItem>
								<ListSubheader>Pasaporte</ListSubheader>
								<MenuItem value='P'>Pasaporte</MenuItem>
							</Select>
						</FormControl>
					</div>

					<div className="input-container">
						<TextField
							
							error={errors.document ? true : false}
							name='document'
							label="Documento de Identidad"
							helperText={errors.document}
							value={form.document}
							variant="standard"
							onChange={form.type_document==='P' ?(
								e => handleChange(e, extractNumberInText)
							):(
								e => handleChange(e, puntoDigito)
							)}
						/>
					</div>

					<div className="input-container">
						<TextField
							error={errors.rif ? true : false}
							name='rif'
							label="Rif (Número)"
							helperText={errors.rif}
							value={form.rif}
							variant="standard"
							onChange={e => handleChange(e, toUpper)}
						/>
					</div>
				</div>
				
				<div className="fieldset">
					<h2 className="fieldset__title">
						<span className="fieldset__title__text">Datos Laborales</span>
					</h2>

					<div className="fieldset__content">
						<div className="input-container">
							<TextField
								
								type='date'
								error={errors.admission ? true : false}
								name='admission'
								label="Ingreso"
								helperText={errors.admission}
								variant="standard"
								onChange={handleChange}
								InputLabelProps={{
									shrink: true,
								}}
								value={form.admission}
							/>
						</div>

						<div className="input-container">
							<TextField
								
								error={errors.extension ? true : false}
								name='extension'
								label="Extensión"
								helperText={errors.extension}
								value={form.extension}
								variant="standard"
								onChange={(e)=> handleChange(e, firstCharName)}
							/>
						</div>

						<div className="input-container">
							<TextField
								
								error={errors.management ? true : false}
								name='management'
								label="Gerencia"
								helperText={errors.management}
								value={form.management}
								variant="standard"
								onChange={(e)=> handleChange(e, firstCharName)}
							/>
						</div>

						<div className="input-container">
							<TextField
								
								error={errors.department ? true : false}
								name='department'
								label="Departamento"
								helperText={errors.department}
								value={form.department}
								variant="standard"
								onChange={(e)=> handleChange(e, firstCharName)}
							/>
						</div>

						<div className="input-container">
							<TextField
								
								error={errors.job_position ? true : false}
								name='job_position'
								label="Cargo"
								helperText={errors.job_position}
								value={form.job_position}
								variant="standard"
								onChange={(e)=> handleChange(e, firstCharName)}
							/>
						</div>
					</div>
				</div>

				<div className="centerFlex">
					<LoadingButton
						loading={loading}
						loadingPosition="start"
						startIcon={<SaveIcon />}
						type="submit"
						variant="outlined"
					>
						Registrar
					</LoadingButton>
				</div>
			</div>
        </form>
    )
}

export default RrhhForm;
