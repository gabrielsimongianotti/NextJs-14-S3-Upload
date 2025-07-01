"use client";
import { useState, useRef } from "react";
import styles from "./FileUpload.module.css";
import InputSelect from "./inputSelect";
import { Button } from "./button"

const FileUpload = () => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState({});
    const [category, setCategory] = useState("medium")
    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleCategoryChange = (value) => {
        setCategory(value);
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
    };

    const handleUpload = async () => {
        setUploading(true);
        const newProgress = {};

        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append("file", files[i]);

            const response = await fetch(`/api/s3-upload?category=${category}`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                newProgress[files[i].name] = 100;
            } else {
                newProgress[files[i].name] = -1;
            }
        }

        setProgress(newProgress);
        setUploading(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.uploadBox}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();
                        const droppedFiles = Array.from(e.dataTransfer.files);
                        setFiles(droppedFiles);
                    }}>
                    <div className={styles.uploadContent}>
                        <div className={styles.icon}>⬆️</div>
                        <p className={styles.uploadDescription}>Joge os seus arquivos aqui para fazer upload</p>
                        <p className={styles.or}>OR</p>
                        <Button
                            onClick={handleClick}

                            title={uploading ? "Carregando as imagens..." : "selecione os arquivos"}
                        />
                        <button className={styles.browseBtn} onClick={handleClick}>
                            Browse
                        </button>
                        <input
                            type="file"
                            multiple
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                        />
                    </div>
                </div>

                <div className={styles.rightSide}>
                    <div className={styles.imageContainer}>

                        <InputSelect action={(event) => handleCategoryChange(event)} />

                    </div>

                    <div className={styles.progressSection}>
                        {files.map((file) => (
                            <div key={file.name} className={styles.fileItem}>
                                <div className={styles.fileLabel}>
                                    <span>{file.name}</span>
                                    {progress[file.name] === 100 ? (
                                        <span className={styles.complete}>🟢 100%</span>
                                    ) : progress[file.name] === -1 ? (
                                        <span className={styles.failed}>❌ Failed</span>
                                    ) : (
                                        <span className={styles.uploading}></span>
                                    )}
                                </div>
                                <div className={styles.progressBar}>
                                    <div
                                        className={styles.progressFill}
                                        style={{ width: `${progress[file.name] || 0}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}

                    </div>
                    {files.length >= 1 &&
                        <>
                            <Button
                                onClick={handleUpload}
                                disabled={uploading || files.length === 0}
                                title={uploading ? "Carregando as imagens..." : "Fazer Upload dos arquivos"}
                            />
                        </>
                    }
                </div>
            </div>


        </div >
    );
};

export default FileUpload;
