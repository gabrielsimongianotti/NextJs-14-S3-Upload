"use client";
import { useState, useRef } from "react";
import Title from "./title";
import { Button } from "./button"
import InputSelect from "./inputSelect"
import styles from "./S3UploadForm.module.css"
const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [names, setNames] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState("medium");
  const fileInputRef = useRef(null);
  const handleClick = () => {
    console.log("oi 2", file)
    fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const filesCollects = files.map((file) => (file.name)
    );
    setNames(filesCollects)
    setFile(e.target.files);
  };
  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;

    setUploading(true);

    try {
      for (var i = 0; i < file.length; i++) {
        const formData = new FormData();
        formData.append("file", file[i]);
        const response = await fetch(`/api/s3-upload?category=${category}`, {
          method: "POST",
          body: formData,
        });
        console.log("response", response)
        const data = await response.json();
        console.log(data.status);

      }
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  }

  return (
    <div className={styles.card}>
      <Title text="Selecione os backgrounds dos adesivos" />
      <form onSubmit={handleSubmit}>
        <InputSelect action={(event) => handleCategoryChange(event)} />

        {/* */}
        <div className={styles.imagePlaceholder}>
          <span role="img" aria-label="image">🖼️</span>
        </div>
        <div className={styles.chooseBox}>

          <div className={styles.fileInput}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              multiple
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <button
              type="button"
              accept="image/*"
              onClick={() => {
                handleClick()
              }}

              className={styles.uploadButton}>
              📁 Selecionar arquivos
            </button>
            <span
              className={styles.noFileText}
            > Files Selects </span>
            {names &&
              names.map((name) => (
                <span
                  className={styles.noFileText}
                >  {name} </span>
              ))}


          </div>
        </div>
        {/* */}

        <Button type="submit" disabled={!file || uploading} title="upload" />
      </form >
    </div >
  );
};

export default UploadForm;
