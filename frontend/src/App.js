// src/App.js
import React from 'react';
import StudentForm from './components/StudentForm';

const App = () => {
  return (
    <div className="App">
      <h1 className='text-center mb-3 mt-3'>Student Application Portal</h1>
      <StudentForm />
    </div>
  );
};

export default App;
