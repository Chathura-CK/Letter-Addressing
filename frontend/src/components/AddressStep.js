// client/src/components/AddressStep.js
import React, { useState } from 'react';
import AddressUploader from './AddressUploader';
import ManualAddressForm from './ManualAddressForm';

const AddressStep = ({ onAddressesReady }) => {
  const [mode, setMode] = useState(''); // 'manual' or 'csv'
  const [addresses, setAddresses] = useState([]);

  const handleModeChange = (option) => {
    setMode(option);
    setAddresses([]);
  };

  const handleAddressList = (list) => {
    setAddresses(list);
    onAddressesReady(list); // send to parent
  };

  return (
    <div>
      <h2>Step 2: Provide Address List</h2>
      <div>
        <button onClick={() => handleModeChange('csv')}>Upload CSV</button>
        <button onClick={() => handleModeChange('manual')}>Enter Manually</button>
      </div>

      <div style={{ marginTop: '20px' }}>
        {mode === 'csv' && <AddressUploader onAddressListReady={handleAddressList} />}
        {mode === 'manual' && <ManualAddressForm onAddressListReady={handleAddressList} />}
      </div>

      {addresses.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4>Preview Addresses</h4>
          <ul>
            {addresses.map((a, i) => (
              <li key={i}>{a.name}, {a.street}, {a.city}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddressStep;
