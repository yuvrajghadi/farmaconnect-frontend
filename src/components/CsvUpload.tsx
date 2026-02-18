import { useState } from "react";
import api from "../services/api";

export function CsvUpload() {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post("/admin/upload-inventory", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (evt) => {
          if (!evt.total) return;
          setProgress(Math.round((evt.loaded / evt.total) * 100));
        }
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Inventory Upload</h2>
        {isUploading && (
          <span className="text-xs text-slate-500">Uploading...</span>
        )}
      </div>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
      />
      <div className="w-full h-2 bg-slate-100 rounded">
        <div
          className="h-2 bg-emerald-500 rounded transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
