"use client";
import { useState, useRef } from "react";
import styles from "./FileUpload.module.css";
import InputSelect from "./inputSelect";
import { Button } from "./button"
import fileUpload from "../assets/Arrow-up.png"
import Image from "next/image"
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
        const uploadTasks = files.map((file) => {
            const formData = new FormData();
            formData.append("file", file);

            return fetch(`/api/s3-upload?category=${category}`, {
                method: "POST",
                body: formData,
            }).then((response) => ({
                name: file.name,
                status: response.ok ? 100 : -1
            }));
        });

        const results = await Promise.all(uploadTasks);
        const newProgress = {};
        results.forEach((res) => {
            newProgress[res.name] = res.status;
        });
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
                        <Image src={fileUpload}
                            alt=""
                            className={styles.updateIcon} />
                        <p className={styles.uploadDescription}>Joge os seus arquivos aqui para fazer upload</p>
                        <p className={styles.or}>OR</p>


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
                                        <span className={styles.uploading}>Pronto para enviar </span>
                                    )}
                                </div>

                                <div className={styles.progressBar}>
                                    <div
                                        className={styles.progressFill}
                                        style={{ width: `${progress[file.name] || 0}%` }}
                                    >
                                    </div>
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
