// client/src/components/AddressUploader.js
import React from 'react';
import Papa from 'papaparse';

const AddressUploader = ({ onAddressListReady }) => {
  const handleCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        onAddressListReady(results.data); // Send address list to parent
      },
    });
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleCSV} />
      <p>Example: name,street,city</p>
    </div>
  );
};

export default AddressUploader;
