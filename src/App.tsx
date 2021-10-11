import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [message, useMessage] = useState('Hello World');
  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default App;
