import React from 'react';
import { NavLink } from 'react-router-dom';

// Components:
import {
	ListItemButton,
	ListItemText,
	ListItemIcon,
} from '@mui/material';

const ButtonList=({to, icon, label, exact})=>{
	const content=<ListItemButton sx={{ pl: 4 }}>
				<ListItemIcon>
					{icon}
				</ListItemIcon>
				<ListItemText primary={label} />
			</ListItemButton>

	return(
		<>
			{to ? <NavLink exact to={to} classNameActive="active">{content}</NavLink> : content}
		</>
	);
};

export default ButtonList;