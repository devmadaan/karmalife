import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Route and Routes

import AccountForm from './components/AccountForm';
import ConfirmationScreen from './components/ConfirmationScreen';
import SuccessScreen from './components/SuccessScreen';
import ErrorScreen from './components/ErrorScreen';
import IFSCLookup from './components/IFSCLookup';

const App = () => {
  return (
    <Router>
      <Routes> {/* Use Routes instead of Switch */}
        <Route path="/" element={<AccountForm />} />
        <Route path="/ifsc" element={<IFSCLookup/>} />
        <Route path="/confirmation" element={<ConfirmationScreen />} />
        <Route path="/success" element={<SuccessScreen />} />
        <Route path="/error" element={<ErrorScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
