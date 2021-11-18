import React, { useState } from 'react';
import './Breadcrumbs.css';

// Components:
import { Link } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';

// Hooks:


// Constantes:
const initialRoute= <Link to="/">Inicio</Link>;


export default function Breadcrumb() {
  const [links, setLinks] = useState(initialRoute);

  return (
    <div className="Breadcrumbs">
      <Breadcrumbs aria-label="breadcrumb">
        {links}
        <Link to="/planes">Planes</Link>
      </Breadcrumbs>
    </div>
  );
};