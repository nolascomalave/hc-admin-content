export function extractNumberInText(text){
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

export function firstCharName_onlyText(string){
	return onlyFirstCharName(extractOnlyText(string));
}

export function onlyName(string){
	string=string.replace(/ /g,'');
	string=string.replace(/\_\_/, '_');
	string=string.replace(/\_\-/, '_');
	string=string.replace(/\-\_/, '-');
	//string=string.replace(/(^\-|\b\-|\-\-)/, '');
	return firstCharName_onlyText(string);
}

export function puntoDigito(number){

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

export function toUpper(string){
	return string.toUpperCase();
}