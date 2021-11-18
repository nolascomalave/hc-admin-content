import { useState } from 'react';
import { Link } from 'react-router-dom';

export const useBreadcrums=(initialBreadcrums)=>{
	const [links, setLinks] = useState(<Link to='/'>Inicio</Link>);

	return [links, setLinks];
};