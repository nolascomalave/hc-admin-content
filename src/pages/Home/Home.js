import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home=({setLoading})=>{
	useEffect(()=>{
		setLoading(true);

		setTimeout(()=>{
			setLoading(false);
		}, 5000);
	}, []);

	return(
		<>
			<h1>Hola</h1>
		</>
	);
};

export default Home;