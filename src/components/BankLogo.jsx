import React from 'react';

const BankLogo = ({ svg }) => {
  // Create a blob URL from the SVG string
  const blobUrl = React.useMemo(() => {
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    return URL.createObjectURL(blob);
  }, [svg]);

  // Clean up the blob URL when the component unmounts
  React.useEffect(() => {
    return () => URL.revokeObjectURL(blobUrl);
  }, [blobUrl]);

  return (
    <div className="w-20 h-10 flex items-center justify-center">
      <img src={blobUrl} alt="Bank Logo" className="w-full h-full object-contain" />
    </div>
  );
};

export default BankLogo;