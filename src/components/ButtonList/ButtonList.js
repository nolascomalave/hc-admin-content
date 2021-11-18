import React, { useState } from 'react';

// Components:
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const ButtonList=({children, label, icon})=>{
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	return(
		<div>
			<ListItemButton className={`${open && 'is-open'}`} onClick={handleClick}>
				{icon && (
					<ListItemIcon>
						{icon}
					</ListItemIcon>
				)}
				<ListItemText primary={label} />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{children}
				</List>
			</Collapse>
		</div>
	);
};

export default ButtonList;