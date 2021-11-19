// -------------------------------------------------------------------------------------------------------------------
// Formateo: ---------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

function extractNumberInText(text){
	return text.replace(/[^0-9]/g, '').toString();
}

function extractOnlyText(text){
	text=text.replace(/(^ |^\-|^\_)/, '');
	text=text.replace(/\_\_/, '_');
	text=text.replace(/\-\-/, '-');
	text=text.replace(/\- /, '-');
	text=text.replace(/ \-/, ' ');
	text=text.replace(/  /, ' ');
	return text.replace(/[^a-zñ\- \_áäàâéèêëíïîìóòôöúûùü]/gi, '');
}

function adaptNumTwo(num){
	let result='';
	switch (String(num).length){
		case 1:
			result=String('0'+num);
			break;
		default :
			result=String(num);
			break;
	}
	return result;
}

function onlyFirstUpper(name){
	let complete='';

	for(let i=0;i<name.length;i++){
		if(i==0){
			complete=complete+name.charAt(i).toUpperCase();
		}else{
			complete=complete+name.charAt(i).toLowerCase();
		}
	}

	return complete;
}

function onlyFirstCharName(name){
	name=name.split(' ');

	for(let i=0;i<name.length;i++){
		name[i]=onlyFirstUpper(name[i]);
	}

	name=name.join(' ');

	return name;
}

function firstCharName_onlyText(string){
	return onlyFirstCharName(extractOnlyText(string));
}

function onlyName(string){
	string=string.replace(/ /g,'');
	string=string.replace(/\_\_/, '_');
	string=string.replace(/\_\-/, '_');
	string=string.replace(/\-\_/, '-');
	//string=string.replace(/(^\-|\b\-|\-\-)/, '');
	return firstCharName_onlyText(string);
}

function toUpper(string){
    return string.toUpperCase();
}

function sanitizeString(string){
	string=string.trim();
	string=string.replace(/\</gi, '&lt;');
	string=string.replace(/\>/gi, '&gt;');
	string=string.replace(/\"/gi, '&quot;');
	return string;
}

function destilde(string){
	let a='[áäàâ]', e='[éèêë]', i='[íïîì]', o='[óòôö]', u='[úûùü]';
	string=string.replace(eval('/'+a+'/g'), 'a');
	string=string.replace(eval('/'+e+'/g'), 'e');
	string=string.replace(eval('/'+i+'/g'), 'i');
	string=string.replace(eval('/'+o+'/g'), 'o');
	string=string.replace(eval('/'+u+'/g'), 'u');

	string=string.replace(eval('/'+a.toUpperCase()+'/g'), 'A');
	string=string.replace(eval('/'+e.toUpperCase()+'/g'), 'E');
	string=string.replace(eval('/'+i.toUpperCase()+'/g'), 'I');
	string=string.replace(eval('/'+o.toUpperCase()+'/g'), 'O');
	return string.replace(eval('/'+u.toUpperCase()+'/g'), 'U');
}

function firstUpper(name){
	let complete='';

	for(let i=0;i<name.length;i++){
		if(i==0){
			complete=complete+name.charAt(i).toUpperCase();
		}else{
			complete=complete+name.charAt(i).toLowerCase();
		}
	}

	return complete;
}

function firstCharName(name){
	name=name.split(' ');

	for(let i=0;i<name.length;i++){
		name[i]=name[i].charAt(0).toUpperCase()+name[i].slice(1);
	}

	name=name.join(' ');

	return name;
}

function puntoDigito(number){

	number=extractNumberInText(String(number));

	if(number.length>0 && Number(number)==0){
		number='';
	}

	let numero='';
	for(let i=0;i<number.length;i++){
		if(number.charAt(i)!='.'){
			numero=numero+number.charAt(i);
		}
	}
	number=numero;

	let n=3;
	let x=0;
	if(number.length>n+x){
		if(number>999){
			number=number.split('');
			do{
				let j=n+x;
				let h=0;
				for(let i=0; i<=n+x; i++){
					let act=number.length-h;
					number[number.length-h]=number[act-1];
					h++;
				}
				x++;
				number[number.length-n-x]='.';
				n=n+3;
			}while(number.length>n+x);
			number=number.join('');
		}else{
			number=number;
		}
	}

	return number;
}

function entityFormat(string){
	string=string.replace(/ {2,}/g, ' ').trim();
	string=string.replace(/\B_/g, '');
	return firstCharName(string.replace(/\B-/g, ''));
}

function rifFormat(rif){
	let rifNumber=extractNumberInText(rif);
	rifNumber=rifNumber.substring(0, rifNumber.length-1);
	return rif.charAt(0).toUpperCase()+'-'+rifNumber+'-'+rif.charAt(rif.length-1);
}

// Formateo de Fechas:
function extractNumberDate(date){
	date=date.split('/');
	return Number(adaptNumTwo(date[2])+''+adaptNumTwo(date[1])+''+adaptNumTwo(date[0]));
}

function getDateLikeJSON(date){
	date=date.split('/');
	return {
		day: Number(date[0]),
		month: Number(date[1]),
		year: Number(date[2])
	}
}

function organizeDate(date){
	date=date.split('-');
	return adaptNumTwo(date[2])+'/'+adaptNumTwo(date[1])+'/'+adaptNumTwo(date[0]);
}



// -------------------------------------------------------------------------------------------------------------------
// Funcionales: ------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------
// Ésta función genera un nombre de usuario conformado por el primer apellido y la inicial del primer nombre. Si
// existe el nombre, la función le agrega una letra de la "a" hasta la "z" comprobando si existe el nombre generado
// y agregando más letras hasta que no encuentre coincidencias.

// Dicha función retorna el nombre de usuario y una variable error, la cual indica que, si hubo un error al hacer con-
// sultas a la base de datos. Si el valor de "error" es "null", entonces no hubo error.

async function usernameInMongoose(name, fname, schema, valName){
	let abc='abcdefghijklmnñopqrstuvwxyz', username=destilde(fname+name.charAt(0)).toUpperCase(), exist=false, error=null,
    initialUserName=username;
    abc=abc.toUpperCase();

    try{
        // Consulta a la base de datos para comprobar si existe el nombre de usuario generado:
        let result=await schema.findOne({[valName]:username}, {[valName]:true, _id:false});
        if(result){
            exist=true;
        }
    }catch(e){
        error=e;
    }

	if(exist==true){
		let iterations=[0];

		do{
			let add='';
			for(let i=0; i<iterations.length; i++){
				add+=abc.charAt(iterations[i]);
			}

			username=username+add;

			for(let j=0; j<27; j++){
				exist=false;
				username=username.split('');
				username[username.length-1]=abc.charAt(j);
				username=username.join('');

                try{
                    // Consulta a la base de datos para comprobar si existe el nombre de usuario generado:
                    let result=await schema.findOne({[valName]:username}, {[valName]:true, _id:false});

                    if(result){
                        exist=true;
                    }else{
                        break;
                    }
                }catch(e){
                    break;
                }
			}

			if(exist==true){
				username=initialUserName;

				if(iterations.length>1){
					for(let i=iterations.length; i>0; i--){
						if(iterations[i-1]<26){
							iterations[i-1]++;
							break;
						}else{
							iterations[i-1]=0;
							if(i-1==0){
								iterations.push(0);
								break;
							}
						}
					}
				}else{
					iterations.push(0);
				}
			}
		}while(exist==true);
	}

	return {
        error,
        username
    };
}

function VerifRIF(RIF){
	let SumRIF, NumRif = RIF, cadena = [], error=null;

	if (NumRif.length == 10){
		for (let i = 0; i < 10; i++){
			cadena[i] = NumRif.substr(i,1);
		}
		cadena[0] = 0;

		switch (NumRif.charAt(0).toUpperCase()){
			case "V":
				cadena[0] = 1;
				break;

			case "E":
				cadena[0] = 2;
				break;

			case "J":
				cadena[0] = 3;
				break;

			case "P":
				cadena[0] = 4;
				break;

			case "G":
				cadena[0] = 5;
				break;

			default:
				error='¡Letra de formato de código incorrecta!';
				break;
		};

		if(error==null){
			cadena[0] = cadena[0] * 4;
			cadena[1] = cadena[1] * 3;
			cadena[2] = cadena[2] * 2;
			cadena[3] = cadena[3] * 7;
			cadena[4] = cadena[4] * 6;
			cadena[5] = cadena[5] * 5;
			cadena[6] = cadena[6] * 4;
			cadena[7] = cadena[7] * 3;
			cadena[8] = cadena[8] * 2;

			SumRIF = cadena[0] + cadena[1] + cadena[2] + cadena[3] +
			cadena[4] + cadena[5] + cadena[6] + cadena[7] + cadena[8];

			let EntRIF = parseInt(SumRIF/11),
			Residuo = SumRIF - (EntRIF * 11),
			DigiVal = 11 - Residuo;

			if (DigiVal > 9){
				DigiVal = 0;
			}

			if (DigiVal != cadena[9]){
				error='¡Rif incorrecto!';
			}
		}
	}else{
		error='¡Rif incorrecto!';
	}

	return error;
}

function validateBisiestYear(year){
	let result=null;
	year=Number(year);

	if(new Date(year, 1, 29).toLocaleDateString()=='29/2/'+year){
		result=true;
	}

	return result;
}

function getTimeDifferenceBettwenDates(date1, date2){
	let meses=[31,28,31,30,31,30,31,31,30,31,30,31], dateMin=null, dateMax=null,
	numberDate1=extractNumberDate(date1), numberDate2=extractNumberDate(date2),
	days=0,	months=0, years=0, sumDay=0, restDay=0;

	date1=getDateLikeJSON(date1);
	date2=getDateLikeJSON(date2);
	date1.month--;
	date2.month--;

	if(numberDate1<numberDate2){
		dateMin=date1;
		dateMax=date2;
	}else if(numberDate1>numberDate2){
		dateMin=date2;
		dateMax=date1;
	}

	if(numberDate1!=numberDate2){
		if(dateMin.year<dateMax.year){
			days=meses[dateMin.month]-dateMin.day;

			if((dateMin.month==1 && dateMin.day<29) && validateBisiestYear(dateMin.year)){
				days++;
			}

			for(let i=(dateMin.month+1); i<meses.length; i++){
				days=days+meses[i];
			}

			sumDay=sumDay+days;

			if(dateMin.month>dateMax.month){
				months=12-(dateMin.month+1);
			}

			for(let i=(dateMin.year+1); i<=dateMax.year; i++){
				if(i<dateMax.year){
					days=days+365;
					years++;
					if(validateBisiestYear(i)){
						days++;
					}
				}else{
					for(let j=0; j<=dateMax.month; j++){
						if(j<dateMax.month){
							sumDay=sumDay+meses[j];
							if(j>dateMin.month){
								months++;
							}
						}else{
							sumDay=sumDay+dateMax.day;
							if(dateMin.day<=dateMax.day){
								if(dateMin.month!=dateMax.month){
									months++;
								}
								restDay=dateMax.day-dateMin.day;
							}else if(dateMax.month==0){
								restDay=meses[11]-dateMax.day;
							}else{
								restDay=meses[(dateMax.month-1)]-(dateMin.day-dateMax.day);
								if(validateBisiestYear(dateMax.year) && (dateMax.month-1)==1){
									restDay++;
								}
							}
						}
					}

					if(validateBisiestYear(i) && ((dateMax.month>1) || dateMax.month>1)){
						sumDay++;

						if(sumDay>365){
							years++;
						}
					}else if(sumDay>364){
						years++;
					}

					if(dateMin.month==dateMax.month && years==0){
						months=11;
					}

					if(dateMax.year-dateMin.year>1){
						days=days;
					}else{
						days=sumDay;
					}
				}
			}
		}else if(dateMax.month>dateMin.month){
			days=days+(meses[dateMin.month]-dateMin.day);

			for(let j=(dateMin.month+1); j<=dateMax.month; j++){
				if(j<dateMax.month){
					days=days+meses[j];
					if(j>dateMin.month){
						months++;
					}
				}else{
					sumDay=sumDay+dateMax.day;
					if(dateMin.day<=dateMax.day){
						months++;
						restDay=dateMax.day-dateMin.day;
					}else if(dateMax.month==0){
						restDay=meses[11]-dateMax.day;
					}else{
						restDay=meses[(dateMax.month-1)]-(dateMin.day-dateMax.day);
						if(validateBisiestYear(dateMax.year) && (dateMax.month-1)==1){
							restDay++;
						}
					}
				}
			}

			days=days+dateMax.day;
			if(validateBisiestYear(dateMax.year)){
				if((dateMax.month==1 && dateMax.day>28) || dateMax.month>1){
					days++;
				}
			}
		}else{
			days=dateMax.day-dateMin.day;
			restDay=days;
		}
	}

	return {
		years,
		months,
		days:restDay
	}
}



// -------------------------------------------------------------------------------------------------------------------
// Validaciones: -----------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

function validateName(name, type, obligatory){
	let error=null;
	name=name.trim();

	if(name.length>0){
		if(name.length>50){
			error='¡El '+type+' no debe contener más de 50 caracteres!';
		}else if(name.length<2){
			error='¡El '+type+' no debe contener menos de 2 caracteres!';
		}else if(/^[a-zA-ZáéíóúÁÉÍÓÚÑñ][a-zA-ZáéíóúÁÉÍÓÚÑñ\-\_]*( [a-zA-ZáéíóúÁÉÍÓÚÑñ][a-zA-ZáéíóúÁÉÍÓÚÑñ\-\_]*)?$/gi.test(name)==false){
			error='¡El '+type+' solo debe contener los caracteres especiales (.\'_-)!';
		}
	}else if(obligatory){
		error='¡Debe introducir el '+type+'!';
	}

	return error;
}

function validateCi(ci, minimo, maximo, obligatory){
	let error=null, min="", max="";
	ci=extractNumberInText(ci);

	if(minimo){
		if(minimo<=0){
			min=1;
		}else{
			min=minimo;
		}
	}else{
		min=1;
	}

	if(maximo){
		if(maximo<=0){
			max=1000;
		}else{
			max=maximo;
		}
	}else{
		max=1;
	}

	if(isNaN(ci)){
		error='¡El número de Cédula introducido no es un número!';
	}else if(ci.charAt(0).toString()=='0'){
		error='¡El primer dígito de la Cédula no debe ser "0"!';
	}else if(ci.length<min){
		error='¡La cédula de identidad debe contener, como mínimo, '+min+' caracteres numéricos!';
	}else if(ci.length>max){
		error='¡La cédula de identidad debe contener, como máximo, '+max+' caracteres numéricos!';
	}

	return error;
}

function validateRif(rif, obligatory){
	let error=null, test=/[vepgj]\d{9}/gi, rifNumer=0, rifChars='';
	rif=rif.replace(/[^0-9vepgj]/gi, '').toUpperCase().trim();
	rifNumer=extractNumberInText(rif);
	rifChars=rif.match(/^[vepgj]/gi)[0] || '';

	if(rif.length>0){
		if(rifChars.length<1){
			error='¡El rif carece de la letra de formato de código!';
		}else if(rifChars.length>1){
			error='¡El rif solo debe contener una letra de formato de código!';
		}else if(!isNaN(rif.charAt(0))){
			error='¡La letra de formato de código del Rif debe definirse en el inicio!';
		}else if(rifNumer.length!=9){
			error='¡El Rif debe contener 9 dígitos!';
		}

		if(error==null && test.test(rif)==false){
			error='¡El formato del Rif introducido es incorrecto!';
		}else if(error==null){
			error=VerifRIF(rif);
		}
	}else if(obligatory){
		error='¡Debe introducir un Rif!';
	}

	return error;
}

function validateBirthYears(birthDate, min, max, obligatory){
	let error=null

    if(birthDate!=undefined && birthDate.trim()!='' && birthDate!=null){
        let actualDate=new Date().toLocaleDateString(), differenceDate=null;
        birthDate=organizeDate(birthDate);
        differenceDate=getTimeDifferenceBettwenDates(actualDate, birthDate);

        if(extractNumberDate(actualDate)>extractNumberDate(birthDate)){
            if(differenceDate.years<min){
                error="¡El recurso humano no debe tener menos de "+min+" años de edad!";
            }else if(differenceDate.years>max){
                error="¡El recurso humano no debe tener más de "+max+" años de edad!";
            }
        }else{
            error=`¡La fecha de nacimiento no debe ser mayor que la fecha de hoy (${actualDate})`;
        }
    }else if(obligatory){
        error='¡Debe introducir la fecha de nacimiento!';
    }

	return error;
}

function validateAdmissionDate(date, min, max, obligatory/*, birth*/){
    let error=null;

    if(date!=undefined && date.trim()!='' && date!=null){
        let actualDate=new Date().toLocaleDateString(), differenceDate=null, differenceBirth=null;
        date=organizeDate(date);
        differenceDate=getTimeDifferenceBettwenDates(actualDate, date);

        /*if(birth){
            birth=organizeDate(birth);
            differenceBirth=getTimeDifferenceBettwenDates(date, birth);
        }*/

        if(extractNumberDate(actualDate)>extractNumberDate(date)){
            if(differenceDate.years<min){
                error="¡El recurso humano no debe tener menos de "+min+" años de haber ingresado!";
            }else if(differenceDate.years>max){
                error="¡El recurso humano no debe tener más de "+max+" años de haber ingresado!";
            }
        }else{
            error=`¡La fecha de ingreso no debe ser mayor que la fecha de hoy (${actualDate})`;
        }
    }else if(obligatory){
        error='¡Debe introducir la fecha de ingreso!';
    }

    return error;
}

function validateSimpleText(text, type, max, obligatory, The){
	let error=null, the='El', a='un';
	text=text.trim();

	if(The){
		the='La';
		a='una';
	}

	if(text.length>0){
		if(text.length<5){
			error='¡'+the+' '+type+' debe contener, como mínimo, 5 caracteres!';
		}else if(text.length>max){
			error='¡'+the+' '+type+' no debe contener más de '+max+' caracteres!';
		}
	}else if(obligatory){
		error=`¡Debe introducir ${a} ${type}!`;
	}

	return error;
}




module.exports={
    extractNumberInText,
    adaptNumTwo,
    onlyName,
    toUpper,
	sanitizeString,
    destilde,
	firstUpper,
	firstCharName,
    extractNumberDate,
    getDateLikeJSON,
    organizeDate,
	rifFormat,
    puntoDigito,
	entityFormat,

    usernameInMongoose,
    VerifRIF,
    validateBisiestYear,
    getTimeDifferenceBettwenDates,

    validateName,
    validateCi,
    validateRif,
    validateBirthYears,
    validateAdmissionDate,
	validateSimpleText
};