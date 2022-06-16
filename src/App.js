import React, { useState } from "react";
import DragDrop from "./components/DragAndDropZone";
import { Button } from "./components/Button";
import { A4_PAPER_DIMENSIONS } from "./consts";
import { imageDimensionsOnA4 } from "./helpers";
import { jsPDF } from "jspdf";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const handleChange = (file) => setImage(file);
  const resetFile = () => handleChange(null);

  const generatePdfFromImages = () => {
    const pdf = new jsPDF();
    const uploadedImage = new Image();
    uploadedImage.src = URL.createObjectURL(image);
    uploadedImage.onload = () => {
      const imageDimensions = imageDimensionsOnA4({
        width: uploadedImage.width,
        height: uploadedImage.height,
      });
      pdf.addImage(
        uploadedImage.src,
        image.type.split("/")[1],
        (A4_PAPER_DIMENSIONS.width - imageDimensions.width) / 2,
        (A4_PAPER_DIMENSIONS.height - imageDimensions.height) / 2,
        imageDimensions.width,
        imageDimensions.height
      );
      pdf.save("download.pdf");
    };
  };

  return (
    <div className="App">
      <section className="wrapper">
        {!image && <DragDrop handleChange={handleChange} />}
        {image && (
          <React.Fragment>
            <div className="image-wrapper">
              <img src={URL.createObjectURL(image)} alt="uploaded" />
            </div>
            <div className="buttons">
              <Button text="Reset" onClick={resetFile} />
              <Button text="Export to pdf" onClick={generatePdfFromImages} />
            </div>
          </React.Fragment>
        )}
      </section>
    </div>
  );
}

export default App;
