// src/components/SystemStatus.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SystemStatus: React.FC = () => { 
  const Navigate = useNavigate();
  
  return (
    <div>
     <h1>status</h1>
     <button onClick={ () => Navigate("cameroon/monitoring") }>Cameroon Monitoring</button>
     <button onClick={ () => Navigate("eswatini/monitoring") }>eswatini Monitoring</button>
     <button onClick={ () => Navigate("Nigeria/monitoring") }>Nigeria Monitoring</button>
     <button onClick={ () => Navigate("Zambia/monitoring") }>zambia Monitoring</button>
    </div>
  );
};

export default SystemStatus;
