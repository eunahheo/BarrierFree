import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

function ImageUploader() {
  // const classes = useStyles();
  // const dispatch = useDispatch();
  // const [imagePreview, setImagePreview] = useState(null);
  // const [imageData, setImageData] = useState(null);
  // const [imageName, setImageName] = useState('');
  // const { image } = useSelector((state) => state.upload);

  return (
    <div>
      <h1> IMAGE UPLOADER</h1>
    </div>
  );
}
//   const onDrop = useCallback((acceptedFiles) => {
//     // Do something with the files
//   }, []);
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   return (
//     <div {...getRootProps()}>
//       <input {...getInputProps()} />
//       {isDragActive ? (
//         <p>Drop the files here ...</p>
//       ) : (
//         <p>Drag 'n' drop some files here, or click to select files</p>
//       )}
//     </div>
//   );
// }

export default ImageUploader;
