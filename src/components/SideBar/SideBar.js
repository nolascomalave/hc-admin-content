import React from 'react';
import './SideBar.css'

// Components:
import {NavLink} from 'react-router-dom';
import ButtonList from '../ButtonList/ButtonList';
import SideBarNavLink from '../SideBarNavLink/SideBarNavLink';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import AddIcon from '@mui/icons-material/Add';
import ViewListIcon from '@mui/icons-material/ViewList';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';

const SideBar=({isOpen, open, close})=>{

	return(
		<aside id="SideBar" className={`SideBar ${isOpen && 'is-open'}`}>
			<div className="container">
				<header className="header bettwenFlex">
					<div className="logo">
						<NavLink exact to='/'>
							<img
								src="/IMG/hc-logos/logo.png"
							/>
						</NavLink>

						<NavLink exact to='/'>
							<p>
								<b>Hi Connection</b><br/>
								Administración de Contenido
							</p>
						</NavLink>
					</div>

					<button
						className="centerFlex"
						title="Cerrar"
						onClick={close}
					>
						<CloseIcon/>
					</button>
				</header>

				<div className="links">
					<Divider/>
					
					<ButtonList
						label='Planes'
						icon={<ViewQuiltIcon/>}
					>
						<SideBarNavLink
							to='/movies'
							icon={<ViewListIcon />}
							label='Ver Todo'
						/>
						<SideBarNavLink
							to="/movies/new"
							icon={<AddIcon />}
							label='Agregar'
						/>
					</ButtonList>

					<Divider/>
				</div>
			</div>
		</aside>
	);
};

export default SideBar;