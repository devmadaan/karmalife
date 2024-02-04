import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AccountForm = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [validationError, setValidationError] = useState('');
  const [selectedOption, setSelectedOption] = useState('manual');
  const [searchInput, setSearchInput] = useState({
    address: '',
    city: '',
    district: '',
    branch: '',
    bankName: ''
  });
  const navigate = useNavigate();

  const validateAccountNumber = (accountNumber) => {
    const isValid = accountNumber.length === 12;
    setValidationError(isValid ? '' : 'Account number should be 12 digits.');
    return isValid;
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    resetFields();
  };

  const resetFields = () => {
    setSearchInput({
      address: '',
      city: '',
      district: '',
      branch: '',
      bankName: ''
    });
    setIfscCode('');
    setValidationError('');
  };

  const handleIFSCValidation = async () => {
    if (!ifscCode) {
      setValidationError('Please enter an IFSC code.');
      return;
    }

    try {
      const response = await axios.get(`https://ifsc.razorpay.com/${ifscCode}`);
      const data = response.data;

      if (data) {
        console.log('IFSC is valid:', data);
        navigate(`/confirmation?accountNumber=${accountNumber}&ifscCode=${ifscCode}`);
      } else {
        console.log('Invalid IFSC code.');
        setValidationError('Invalid IFSC code.');
      }
    } catch (error) {
      console.error('Error validating IFSC:', error);
      setValidationError('Error validating IFSC.');
    }
  };

  const renderSearchFields = () => {
    if (selectedOption !== 'search') return null;

    return (
      <div className="form-group">
        <label htmlFor="bankName">Bank Name:</label>
        <input
          type="text"
          id="bankName"
          placeholder="Bank Name"
          value={searchInput.bankName}
          onChange={(e) =>
            setSearchInput({ ...searchInput, bankName: e.target.value })
          }
        />
        <label htmlFor="branch">Bank Branch:</label>
        <input
          type="text"
          id="branch"
          placeholder="Bank Branch"
          value={searchInput.branch}
          onChange={(e) =>
            setSearchInput({ ...searchInput, branch: e.target.value })
          }
        />
        <label htmlFor="cities">Cities:</label>
        <select
          id="cities"
          multiple
          value={searchInput.city}
          onChange={(e) =>
            setSearchInput({ ...searchInput, city: Array.from(e.target.selectedOptions, (item) => item.value) })
          }
        >
          <option value="city1">City 1</option>
          <option value="city2">City 2</option>
          <option value="city3">City 3</option>
          {/* Add more cities as needed */}
        </select>
      </div>
    );
  };


  return (
    <div>
      <input
        type="number"
        placeholder="Account Number"
        value={accountNumber}
        onChange={(e) => {
          const inputAccountNumber = e.target.value;
          setAccountNumber(inputAccountNumber);

          // Validate account number when it's 12 digits
          if (inputAccountNumber.length === 12) {
            validateAccountNumber(inputAccountNumber);
          } else {
            setValidationError('Account number should be 12 digits.');
          }
        }}
      />

      <select
        value={selectedOption}
        onChange={(e) => handleOptionChange(e.target.value)}
      >
        <option value="manual">Enter IFSC Manually</option>
        <option value="search">Search by Details</option>
      </select>
      {selectedOption === 'manual' && (
        <div className="form-group">
          <label htmlFor="manualIfscCode">IFSC Code:</label>
          <input
            type="text"
            id="manualIfscCode"
            placeholder="IFSC Code"
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value)}
          />
          <button onClick={handleIFSCValidation}>Validate IFSC Code</button>
        </div>
      )}
      {renderSearchFields()}
      <button onClick={handleIFSCValidation}>Validate and Proceed</button>
      {validationError && <div style={{ color: 'red' }}>{validationError}</div>}
    </div>
  );
};

export default AccountForm;
