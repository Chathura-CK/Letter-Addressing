// client/src/App.js
import React, { useState } from 'react';
import AddressStep from './components/AddressStep';
import DownloadLetters from './components/DownloadLetters';

function App() {
  const [addresses, setAddresses] = useState([]);
  const [templatePath, setTemplatePath] = useState('');
  const [templateFile, setTemplateFile] = useState(null);

  const handleTemplateUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('letter', file);

    const res = await fetch('https://letter-addressing.azurewebsites.net/api/letter/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    setTemplatePath(data.filePath); // Server-side path to template
    setTemplateFile(file.name);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Letter Generator App</h1>

      <h2>Step 1: Upload Letter Template</h2>
      <input type="file" accept=".pdf" onChange={handleTemplateUpload} />
      {templateFile && <p>Uploaded: {templateFile}</p>}

      <hr />

      <AddressStep onAddressesReady={setAddresses} />

      <hr />

      {addresses.length > 0 && templatePath && (
        <DownloadLetters addresses={addresses} templatePath={templatePath} />
      )}
    </div>
  );
}

export default App;
