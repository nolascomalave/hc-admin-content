import React, { useEffect, useContext } from 'react';
import './NewRrhh.css';

// Components:
import {
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
import {LoadingButton} from '@mui/lab';

// Icons:
import PersonAddIcon from '@mui/icons-material/PersonAdd';

// Hooks:
import { useForm } from '../../hooks/useForm';

// Helpers:
import {
	extractNumberInText,
	onlyName,
	toUpper,
	puntoDigito
} from '../../helpers/helpValuesFormat';
import {
	validateName,
	validateCi,
	validateRif,
	validateBirthYears,
	validateAdmissionDate
} from '../../helpers/helpValidators';

// Contexts:
import LoadingContext from '../../contexts/LoadingContext';


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
	registered_extension:false,
	extension: '',
	new_extension:'',
	registered_management:false,
	management: '',
	new_management:'',
	registered_department:false,
	department:'',
	new_department:'',
	registered_jop_position:false,
	jop_position: '',
	new_jop_position:''
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

const NewRrhh=()=>{
	const {setLoading} = useContext(LoadingContext),
	{
		errors,
		setErrors,
		form,
		loading,
		handleChange
	} = useForm(initialForm);

	useEffect(()=>{
		setLoading(true);
		setTimeout(()=>{
			setLoading(false);
		}, 5000);
	}, []);

	useEffect(()=>{
		if(form.document){
			if(form.type_document==='V' || form.type_document==='E'){
				form.document=puntoDigito(form.document);
			}else{
				form.document=extractNumberInText(form.type_document+''+form.document);
			}
		}
	}, [form.type_document]);

	const handleSubmit=(e)=>{
		e.preventDefault();

		setErrors(validateForm(form, errors));
	};

	return(
		<div className="NewRrhh">
			<header className="header-section startFlex">
				<PersonAddIcon/>
				<h1>Nuevo Recurso Humano</h1>
			</header>
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
								onChange={handleChange}
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
								onChange={handleChange}
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
								onChange={handleChange}
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
								onChange={handleChange}
							/>
						</div>

						{/* <div className="input-container select">
							<FormGroup>
								<FormControlLabel control={(
									<Switch
										
										name='registered_extension'
										checked={form.registered_extension}
										onChange={handleChange}
									/>
								)} label="Extensión no registrada" />
							</FormGroup>

							<FormControl
								style={{display:`${form.registered_extension ? 'none' : ''}`}}
								variant="standard"
								required={!form.registered_extension}
							>
								<InputLabel htmlFor="extension-input">Extensión</InputLabel>
								<Select
									id="extension-input"
									error={errors.extension ? true : false}
									name='extension'
									defaultValue='principal'
									value={form.extension}
									onChange={e => handleChange(e)}
								>
									<MenuItem value='principal'>Hi Connection</MenuItem>
								</Select>
							</FormControl>

							<TextField
								required={form.registered_extension}
								style={{display:`${!form.registered_extension ? 'none' : ''}`}}
								error={errors.new_extension ? true : false}
								name='new_extension'
								label="Extensión"
								helperText={errors.new_extension}
								value={form.new_extension}
								variant="standard"
								onChange={handleChange}
							/>
						</div>

						<div className="input-container select">
							<FormGroup>
								<FormControlLabel control={(
									<Switch
										
										name='registered_management'
										checked={form.registered_management}
										onChange={handleChange}
									/>
								)} label="Gerencia no registrada" />
							</FormGroup>

							<FormControl
								style={{display:`${form.registered_management ? 'none' : ''}`}}
								variant="standard"
								required={!form.registered_management}
							>
								<InputLabel htmlFor="management-input">Gerencia</InputLabel>
								<Select
									id="management-input"
									error={errors.management ? true : false}
									name='management'
									defaultValue='principal'
									value={form.management}
									onChange={e => handleChange(e)}
								>
									<MenuItem value='principal'>Hi Connection</MenuItem>
								</Select>
							</FormControl>

							<TextField
								required={form.registered_management}
								style={{display:`${!form.registered_management ? 'none' : ''}`}}
								error={errors.new_management ? true : false}
								name='new_management'
								label="Gerencia"
								helperText={errors.new_management}
								value={form.new_management}
								variant="standard"
								onChange={handleChange}
							/>
						</div>

						<div className="input-container select">
							<FormGroup>
								<FormControlLabel control={(
									<Switch
										
										name='registered_department'
										checked={form.registered_department}
										onChange={handleChange}
									/>
								)} label="Departamento no registrado" />
							</FormGroup>

							<FormControl
								style={{display:`${form.registered_department ? 'none' : ''}`}}
								variant="standard"
								required={!form.registered_department}
							>
								<InputLabel htmlFor="department-input">Departamento</InputLabel>
								<Select
									id="department-input"
									error={errors.department ? true : false}
									name='department'
									defaultValue='principal'
									value={form.department}
									onChange={e => handleChange(e)}
								>
									<MenuItem value='principal'>Hi Connection</MenuItem>
								</Select>
							</FormControl>

							<TextField
								required={form.registered_department}
								style={{display:`${!form.registered_department ? 'none' : ''}`}}
								error={errors.new_department ? true : false}
								name='new_department'
								label="Departamento"
								helperText={errors.new_department}
								value={form.new_department}
								variant="standard"
								onChange={handleChange}
							/>
						</div>

						<div className="input-container select">
							<FormGroup>
								<FormControlLabel control={(
									<Switch
										
										name='registered_job_position'
										checked={form.registered_job_position}
										onChange={handleChange}
									/>
								)} label="Cargo no registrado" />
							</FormGroup>

							<FormControl
								style={{display:`${form.registered_job_position ? 'none' : ''}`}}
								variant="standard"
								required={!form.registered_job_position}
							>
								<InputLabel htmlFor="job_position-input">Cargo</InputLabel>
								<Select
									id="job_position-input"
									error={errors.job_position ? true : false}
									name='job_position'
									defaultValue='principal'
									value={form.job_position}
									onChange={e => handleChange(e)}
								>
									<MenuItem value='principal'>Hi Connection</MenuItem>
								</Select>
							</FormControl>

							<TextField
								required={form.registered_job_position}
								style={{display:`${!form.registered_job_position ? 'none' : ''}`}}
								error={errors.new_job_position ? true : false}
								name='new_job_position'
								label="Cargo"
								helperText={errors.new_job_position}
								value={form.new_job_position}
								variant="standard"
								onChange={handleChange}
							/>
						</div> */}
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
			</form>
		</div>
	);
};

export default NewRrhh;