import { useState } from 'react';

export const useForm=(initialForm, validateForm)=>{
	const [form, setForm]=useState(initialForm),
	[errors, setErrors]=useState({}),
	[loading, setLoading]=useState(false),
	[response, setResponse]=useState(null);

	const handleChange=(e, format)=>{
		let {name, value, checked, type}=e.target;

		if(type==='checkbox' || type==='radio'){
			value=checked;
		}else{
			if(format){
				value=format(value);
				e.target.value=value;
			}
		}

		setErrors({
			...errors,
			[name]:''
		});
		setForm({
			...form,
			[name]:value
		});
	};
	/*const handleAutoCompleteChange=(e, newValue, input, format)=>{
		const {name} = input.current;

		if(format){
			newValue=format(newValue);
		}

		console.log(input);

		input.current.value=newValue;

		setErrors({
			...errors,
			[name]:''
		});
		setForm({
			...form,
			[name]:newValue
		});
	}*/

	const handleBlur=(e)=>{
		handleChange(e);
		setErrors(validateForm(e.target.name, form, errors));
	};

	/*const handleSubmit=(e)=>{
		let names=Object.keys(form);
		e.preventDefault();

		for(let i=0; i<names.length; i++){
			setErrors(validateForm(names[i], form, errors));
		}

		if(Object.keys(errors).length===0){
			setLoading(true);

			helpHttp()
				.post('http://localhost:4000/fake-mail-api/nolascomalave@hotmail.com', {
					body:form,
					headers:{
						"Content-Type":"application/json",
						Accept: "application/json"
					}
				})
				.then((res)=>{
					setForm(initialForm);
					setResponse(res);
					setLoading(false);

					setTimeout(()=>{
						setResponse(null);
					}, 5000);
				});
		}else{
			return;
		}
	};*/

	return {
		errors,
		setErrors,
		form,
		loading,
		response,
		handleBlur,
		handleChange,
		//handleAutoCompleteChange
		//handleSubmit
	}
}