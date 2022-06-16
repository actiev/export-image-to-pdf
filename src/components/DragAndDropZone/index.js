import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

function DragDrop({ handleChange }) {
  const [error, setError] = useState("");
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxSize: 2097152,
    multiple: false,
    onDropAccepted: (acceptedFiles) => {
      setError(null);
      handleChange(acceptedFiles[0]);
    },
    onDropRejected: (fileRejections) => {
      fileRejections.forEach((file) => {
        file.errors.forEach((err) => {
          if (err.code === "file-too-large") {
            setError("Image is larger than 2Mb");
          }

          if (err.code === "file-invalid-type") {
            setError("Image type must be image/jpeg,image/png");
          }
        });
      });
    },
  });

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {!acceptedFiles.length && (
          <>
            <p>Drag 'n' drop some image here, or click to select image</p>
            <em>(Only *.jpeg and *.png images will be accepted)</em>
          </>
        )}
        {error && <p className="error-message">Error: {error}</p>}
      </div>
    </section>
  );
}

export default DragDrop;
