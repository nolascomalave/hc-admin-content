export const helpHttp=()=>{
	const customFetch=(src, options)=>{

		const defaultHeader={
			accept: "application/json",
		}

		const controller=new AbortController();
		options.signal=controller.signal;

		options.method=options.method || 'GET';

		options.headers=options.headers 
		? {...defaultHeader, ...options.headers}
		: defaultHeader;

		options.body=JSON.stringify(options.body) || false;

		if(!options.body) delete options.body;

		//console.log(options);

		setTimeout(()=> controller.abort(), 30000);

		return fetch(src, options)
			.then((res)=> res.ok 
				? res.json() 
				: Promise.reject({
					err:true,
					status: res.status || '00',
					statusText: res.statusText || 'Ocurrió un error'
				})
			)
			.catch(err=> err);
	};

	const get=(src, options = {})=>{
		return customFetch(src, options);
	};

	const post=(src, options = {})=>{
		options.method='POST';
		return customFetch(src, options);
	};

	const put=(src, options = {})=>{
		options.method='PUT';
		return customFetch(src, options);
	};

	const del=(src, options = {})=>{
		options.method='DELETE';
		return customFetch(src, options);
	};

	return {
		del,
		get,
		post,
		put
	};
}