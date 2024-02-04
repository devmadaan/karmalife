import React from 'react';
import { useLocation } from 'react-router-dom';

const ConfirmationScreen = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const accountNumber = searchParams.get('accountNumber');
  const ifscCode = searchParams.get('ifscCode');

  return (
    <div>
      <h2>Confirmation Screen</h2>
      <p>Account Number: {accountNumber}</p>
      <p>IFSC Code: {ifscCode}</p>
      {/* Add UI elements for Penny Drop and success/error options */}
    </div>
  );
};

export default ConfirmationScreen;
