import React, { useEffect, useState } from 'react';

const PrintPreview = ({ pdfBlob }) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const pdfURL = URL.createObjectURL(pdfBlob);
    setUrl(pdfURL);
    return () => URL.revokeObjectURL(pdfURL);
  }, [pdfBlob]);

  return (
    <div>
      <iframe src={url} width="100%" height="600px" title="Letter PDF" />
      <button onClick={() => window.print()}>Print</button>
    </div>
  );
};
export default PrintPreview;