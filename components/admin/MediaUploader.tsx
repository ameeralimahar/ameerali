"use client";

import { useRef, useState } from "react";

type UploadType = "image" | "video";

interface Props {
  type: UploadType;
  currentUrl: string;
  onUploaded: (url: string) => void;
  label?: string;
}

const ACCEPT = {
  image: "image/jpeg,image/png,image/webp,image/gif",
  video: "video/mp4,video/webm,video/quicktime",
};

const MAX_SIZE = {
  image: 10 * 1024 * 1024,   // 10 MB
  video: 200 * 1024 * 1024,  // 200 MB
};

export default function MediaUploader({ type, currentUrl, onUploaded, label }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string>(currentUrl);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);

    if (file.size > MAX_SIZE[type]) {
      setError(`File too large. Max ${type === "image" ? "10 MB" : "200 MB"}.`);
      return;
    }

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", type === "image" ? "images" : "videos");

      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? "Upload failed");

      setPreview(data.url);
      onUploaded(data.url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function handleRemove() {
    setPreview("");
    onUploaded("");
  }

  function handleUrlChange(val: string) {
    setPreview(val);
    onUploaded(val);
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
        {label ?? (type === "image" ? "Cover Image" : "Demo Video")}
      </span>

      {/* Preview */}
      {preview && (
        <div className="relative overflow-hidden rounded-lg border border-line bg-surface2 group">
          {type === "image" ? (
            <img src={preview} alt="Preview" className="max-h-48 w-full object-cover" />
          ) : (
            <video src={preview} controls className="max-h-48 w-full" />
          )}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 hidden group-hover:flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white text-sm hover:bg-red-500/80 transition-colors"
            title="Remove"
          >
            ×
          </button>
        </div>
      )}

      {/* Drop zone */}
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-line/60 bg-surface/40 px-4 py-5 transition-all hover:border-teal/40 hover:bg-surface"
      >
        {uploading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-teal border-t-transparent" />
            <span className="font-mono text-xs text-teal">Uploading…</span>
          </div>
        ) : (
          <>
            <span className="text-2xl">{type === "image" ? "🖼️" : "🎬"}</span>
            <span className="font-mono text-xs text-muted text-center">
              {preview ? "Click to replace" : "Click to upload"} {type}
              <br />
              <span className="text-[10px] opacity-60">
                {type === "image" ? "JPG, PNG, WebP — max 10 MB" : "MP4, WebM, MOV — max 200 MB"}
              </span>
            </span>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT[type]}
        onChange={handleFile}
        className="hidden"
        disabled={uploading}
      />

      {/* URL paste fallback */}
      <input
        type="text"
        value={preview}
        onChange={(e) => handleUrlChange(e.target.value)}
        placeholder={`Or paste ${type} URL…`}
        className="rounded border border-line bg-surface px-3 py-2 font-body text-xs text-muted placeholder:text-muted/50 focus:border-teal/60 focus:text-ink focus:outline-none w-full"
      />

      {error && <p className="font-mono text-xs text-red-400">{error}</p>}
    </div>
  );
}
