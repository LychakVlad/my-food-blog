import React, { useState } from 'react';
import axios from 'axios';

async function postImage({ image, description }) {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('description', description);
  try {
    const result = await axios.post('http://localhost:3001/images', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    });
    return result.data;
  } catch (error) {
    console.log('Error:', error);
  }
}

const UploadImage = () => {
  const [file, setFile] = useState();
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const submit = async (event) => {
    event.preventDefault();
    const result = await postImage({ image: file, description });
    setImages([result.image, ...images]);
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div>
      <form onSubmit={submit} className="flex flex-col items-center gap-8">
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="Description"
        />
        <button type="submit">Submit</button>
      </form>

      {images?.map((image) => (
        <div key={image}>
          <img src={image} />
        </div>
      ))}
    </div>
  );
};

export default UploadImage;
