import React, { useState } from 'react';

const IFSCLookup = () => {
  const [bankName, setBankName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [ifscCodes, setIFSCCodes] = useState([]);

  const handleBankNameChange = (event) => {
    setBankName(event.target.value);
  };

  const handleBranchNameChange = (event) => {
    setBranchName(event.target.value);
  };

  // Update the fetchIFSCCodes function
  const fetchIFSCCodes = async () => {
    try {
      // Interpolate bankName and branchName into the URL
      const url = `https://ifsc.razorpay.com/places?bankcode=${encodeURIComponent(bankName)}&branch=${encodeURIComponent(branchName)}`;

      const response = await fetch(url);
      const data = await response.json();
      const branches = data.branches || [];
      const matchingIFSCCodes = branches
        .filter(branch => branch.BANK.toLowerCase() === bankName.toLowerCase() && branch.BRANCH.toLowerCase() === branchName.toLowerCase())
        .map(branch => branch.IFSC);
      setIFSCCodes(matchingIFSCCodes);
    } catch (error) {
      console.error('Error fetching IFSC codes:', error);
    }
  };

  const handleSearch = () => {
    fetchIFSCCodes();
  };

  return (
    <div>
      <label>
        Bank Name:
        <input type="text" value={bankName} onChange={handleBankNameChange} />
      </label>
      <label>
        Branch Name:
        <input type="text" value={branchName} onChange={handleBranchNameChange} />
      </label>
      <button onClick={handleSearch}>Search</button>

      <div>
        <h3>Matching IFSC Codes:</h3>
        <ul>
          {ifscCodes.map((ifsc, index) => (
            <li key={index}>{ifsc}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IFSCLookup;
