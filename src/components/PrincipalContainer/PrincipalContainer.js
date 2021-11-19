import React, { } from 'react';
import './PrincipalContainer.css';

// Components:
import AppBar from '../AppBar/AppBar';
import ContentRoutes from '../ContentRoutes/ContentRoutes';

// Hooks:
//import { useBreadcrums } from '../../hooks/useBreadcrums';

// ContextWrappers:
import { LoadingProvider } from '../../contexts/LoadingContext';

const PrincipalContainer=({...rest})=>{
	return (
		<div id="PrincipalContainer" className="PrincipalContainer">
			<LoadingProvider>
				<AppBar
					{...rest}
				/>

				<ContentRoutes />
			</LoadingProvider>
		</div>
	);
};

export default PrincipalContainer;