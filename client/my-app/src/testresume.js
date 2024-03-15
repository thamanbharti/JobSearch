import React, { useState } from 'react';
import axios from 'axios';

function Testresume() {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            alert('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post('http://localhost:8080/api/v1/application/upload-resume', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('File uploaded successfully');
        } catch (error) {
            console.log(formData)
            alert('Error uploading file');
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <div>
                <h2>Upload a File</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="file">Select file:</label>
                    <input type="file" name="file" id="file" onChange={handleFileChange} /><br /><br />
                    <input type="submit" value="Upload" />
                </form>
            </div>
        </div>
    );
}

export default Testresume;
