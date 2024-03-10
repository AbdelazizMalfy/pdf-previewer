import React, { ChangeEvent, FC, useState } from 'react';
import axios from 'axios';

const FileUpload: FC = () => {
  const [file, setFile] = useState<File| null>(null);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      return
    }

    setLoading(true)

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.data) {
        setError('This PDF file seems to be blank. please select another PDF file')
      }

      setText(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    setLoading(false)
    setFile(null)
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Only PDF files are accepted. Please select a PDF file.');
        setFile(null);
      }
    }
};

  const handleCopyText = () => {
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        alert('Text copied to clipboard');
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div id='test' style={{width: 600, marginTop: 70}}>
      <form onSubmit={handleSubmit} style={{display: 'flex', justifyContent: 'space-between'}}>
        <input type="file" accept='application/pdf' onChange={handleChange} />
        <button disabled={!file} type="submit">Upload</button>
      </form>
      {error && <div style={{color: 'red'}}>{error}</div>}
      {text && (
        <div style={{ position: 'relative' }}>
          <textarea style={{ width: '100%', maxHeight: 450, marginTop: 20 }} rows={text.length / 20} value={text} readOnly />
          <button onClick={handleCopyText} style={{ position: 'absolute', bottom: 10, right: 10, zIndex: 1, marginRight: 2 }}>
            Copy
          </button>
        </div>
      )}
    </div>
  );
}

export default FileUpload;