export const sres=(string)=>{
	let chars='\\/-^[]()|\'"`+$?¡¿!*.{}<>';

	for(let i=0; i<chars.length; i++){
		string=string.replace(eval('/\\'+chars.charAt(i)+'/gi'), '\\'+chars.charAt(i));
	}

	return string;
}

export const regularExpressionVocalGroup=(string)=>{
	let mal='aáäàâeéèêëiíïîìoóòôöuúûùü';
	let a_group='[aáäàâ]', e_group='[eéèêë]', i_group='[iíïîì]', o_group='[oóòôö]', u_group='[uúûùü]';
	let result='';

	for(let i=0; i<string.length; i++){
		let numero=0, changed=false;
		for(let j=0; j<mal.length; j++){
			if(string.charAt(i)===mal.charAt(j) || string.charAt(i).toUpperCase()===mal.charAt(j).toUpperCase()){
				numero=j;
				changed=true;
				break;
			}
		}

		if(changed===true){
			if(numero<5){
				result=result+'('+a_group+'|'+a_group.toUpperCase()+')';
			}else if(numero<10){
				result=result+'('+e_group+'|'+e_group.toUpperCase()+')';
			}else if(numero<14){
				result=result+'('+i_group+'|'+i_group.toUpperCase()+')';
			}else if(numero<19){
				result=result+'('+o_group+'|'+o_group.toUpperCase()+')';
			}else{
				result=result+'('+u_group+'|'+u_group.toUpperCase()+')';
			}
		}else{
			result=result+string.charAt(i);
		}
	}

	//return string;
	return result;
}

export const busqueda=(busqueda, place)=>{
	let regExp=/ /gi;
	busqueda=sres(busqueda);
	busqueda=regularExpressionVocalGroup(busqueda);
	regExp=eval('/'+busqueda+'/gi');
	return regExp.test(place);
}