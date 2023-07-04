import classNames from "classnames";
import React, { useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./ImageUploader.module.scss";
import Delete from "../../assests/images/delete.svg";
import { Context } from "@/contexts";

interface Props {
  isError: boolean;
  defaultValue?: string;
}

const ImageUploader = ({ isError, defaultValue }: Props) => {
  const { selectedImage, setSelectedImage } = useContext(Context);

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleDelete = () => {
    setSelectedImage(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
      "image/heic": [],
      "image/jfif": [],
    },
  });

  useEffect(() => {
    setSelectedImage(null);
  }, [isError]);

  useEffect(() => {
    setSelectedImage(defaultValue);
  }, [defaultValue]);

  return (
    <div
      className={classNames(styles.imageUploader, isError && styles.isError)}
    >
      {!selectedImage ? (
        <>
          <div
            {...getRootProps()}
            className={classNames(
              styles.dropzone,
              isDragActive && styles.active
            )}
          >
            {!selectedImage && <input {...getInputProps()} />}
            <p>Drag and drop an image here, or click to select an image</p>
          </div>
        </>
      ) : (
        <>
          <div className={styles.preview}>
            <img
              src={selectedImage}
              alt="Selected"
              className={styles.previewImage}
            />
            <span onClick={handleDelete}>
              <Delete />
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageUploader;
