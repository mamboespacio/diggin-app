"use client";
import React, { useState, useRef } from "react";
import { StrapiImage } from "./StrapiImage";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function generateDataUrl(file, callback) {
  const reader = new FileReader()
  reader.onload = () => callback(reader.result)
  reader.readAsDataURL(file)
}

function ImagePreview({ dataUrl }) {
  return (
    <StrapiImage
      src={dataUrl}
      alt="preview"
      height={80}
      width={80}
      className="aspect-[1/1]"
    />
  );
}

function ImageCard({
  dataUrl,
  fileInput,
}) {
  const imagePreview = dataUrl ? <ImagePreview dataUrl={dataUrl} /> : <p>No image selected</p>;

  return (
    <div className="w-full relative">
      <div className="flex items-center">
        <div className="flex items-center space-x-4">
          {imagePreview}
        </div>
        <button
          onClick={() => fileInput.current?.click()}
          className="w-full absolute inset-0"
          type="button"
        ></button>
      </div>
      
    </div>
  );
}

export default function ImagePicker({
  id,
  name,
  label,
  defaultValue,
}) {
  const fileInput = useRef(null);
  const [dataUrl, setDataUrl] = useState(defaultValue ?? null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) generateDataUrl(file, setDataUrl);
  };

  return (
    <React.Fragment>
      <div className="hidden">
        <Label htmlFor={name}>{label}</Label>
        <Input
          type="file"
          id={id}
          name={name}
          onChange={handleFileChange}
          ref={fileInput}
          accept="image/*"
        />
      </div>
      <ImageCard dataUrl={dataUrl ?? ""} fileInput={fileInput} />
    </React.Fragment>
  );
}