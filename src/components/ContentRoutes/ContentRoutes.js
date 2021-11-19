import React, { } from 'react';
import './ContentRoutes.css';
import { Route, Switch } from 'react-router-dom';

// Components:

// Pages:
import Home from '../../pages/Home/Home';
import NewRrhh from '../../pages/NewRrhh/';

const ContentRoutes = ()=>{

	return (
		<section id="ContentRoutes" className="ContentRoutes relative">
			<Switch>
				{/* Rutas de Recursos Humanos */}
				<Route exact to="/rrhh/new" children={<NewRrhh />} />
				<Route exact to="/rrhh" children={<Home/>} />

				<Route exact to="/" children={<Home/>} />
			</Switch>
		</section>
	);
};

export default ContentRoutes;