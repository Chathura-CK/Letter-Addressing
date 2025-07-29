// client/src/components/UploadLetter.js
import React, { useState } from 'react';
import axios from 'axios';

const UploadLetter = () => {
  const [file, setFile] = useState(null);

  const uploadTemplate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('letter', file);
    await axios.post('https://letter-addressing.azurewebsites.net/api/letter/upload', formData);
    alert('Uploaded!');
  };

  return (
    <form onSubmit={uploadTemplate}>
      <input type="file" accept=".pdf,.docx" onChange={e => setFile(e.target.files[0])} />
      <button type="submit">Upload Template</button>
    </form>
  );
};

export default UploadLetter;
