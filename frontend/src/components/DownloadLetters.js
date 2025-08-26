// client/src/components/DownloadLetters.js
import React from 'react';
import axios from 'axios';

const DownloadLetters = ({ addresses, templatePath }) => {
  const download = async () => {
    try {
      
      const response = await axios.post(
        '/api/letter/generate',
        { addresses, templatePath }, // sending array of addresses
        {
          headers: {
            'Content-Type': 'application/json'
          },
          responseType: 'blob' // important for binary data like zip
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'letters.zip');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // cleanup
    } catch (error) {
      console.error('Error downloading letters:', error);
      alert('❌ Failed to download letters. Check the server console and browser console for more info.');
    }
  };

  return (
    <div>
      <button onClick={download}>📩 Download Letters</button>
    </div>
  );
};

export default DownloadLetters;
