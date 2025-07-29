// client/src/components/ManualAddressForm.js
import React, { useState } from 'react';

const ManualAddressForm = ({ onAddressListReady }) => {
  const [addresses, setAddresses] = useState([{ name: '', street: '', city: '' }]);

  const handleChange = (index, field, value) => {
    const updated = [...addresses];
    updated[index][field] = value;
    setAddresses(updated);
  };

  const addRow = () => {
    setAddresses([...addresses, { name: '', street: '', city: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = addresses.filter(a => a.name && a.street && a.city);
    onAddressListReady(valid); // Send address list to parent
  };

  return (
    <form onSubmit={handleSubmit}>
      {addresses.map((addr, i) => (
        <div key={i} style={{ marginBottom: '8px' }}>
          <input placeholder="Name" value={addr.name} onChange={e => handleChange(i, 'name', e.target.value)} />
          <input placeholder="Street" value={addr.street} onChange={e => handleChange(i, 'street', e.target.value)} />
          <input placeholder="City" value={addr.city} onChange={e => handleChange(i, 'city', e.target.value)} />
        </div>
      ))}
      <button type="button" onClick={addRow}>+ Add Row</button>
      <button type="submit">Use These Addresses</button>
    </form>
  );
};

export default ManualAddressForm;
