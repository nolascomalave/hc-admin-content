import { useState, useEffect } from 'react';

export const useFetch=(url)=>{
	const [data, setData]=useState(null), [error, setError]=useState(null),
	[loading, setLoading]=useState(false);

	useEffect(()=>{
		const abortController=new AbortController(),
		signal=abortController.signal;

		const fecthData=async ()=>{
			setLoading(true);

			try{
				const res=await fetch(url, {
					method: 'GET',
					mode: 'cors'
				});

				if(!res.ok){
					let err=new Error('Error en la petición Fetch.');
					err.status=res.status || '00';
					err.statusText=res.statusText || 'Ocurrió un error.';
					throw err;
				}

				const json = await res.json();

				if(!signal.aborted){
					setData(json);
					setError(null);
				}
			}catch(err){
				if(!signal.aborted){
					setData(null);
					setError(err);
				}
			}finally{
				if(!signal.aborted){
					setLoading(false);
				}
			}
		};

		fecthData();

		return ()=> abortController.abort();
	}, [url]);

	return { data, error, loading }
}