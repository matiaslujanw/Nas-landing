"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { isVideoSrc } from "@/components/landing/AppPhone";

const BUCKET = "site-images";

/** Supabase corta las subidas grandes; avisamos antes de intentar. */
const MAX_MB = 45;

export default function MediaField({
  name,
  label,
  hint,
  defaultValue,
  disabled,
}: {
  name: string;
  label: string;
  hint?: string;
  defaultValue: string;
  disabled?: boolean;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_MB * 1024 * 1024) {
      setError(
        `El archivo pesa ${(file.size / 1024 / 1024).toFixed(0)} MB. El máximo es ${MAX_MB} MB — recortá el video o bajale la calidad.`
      );
      e.target.value = "";
      return;
    }

    setUploading(true);
    setError("");

    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() || "mp4";
      const path = `${name.replace(/\./g, "-")}-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { upsert: true, cacheControl: "3600" });
      if (upErr) throw upErr;

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      setUrl(data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo subir el archivo.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[13px] font-semibold text-bosque">{label}</span>
      <div className="flex items-start gap-4">
        <div className="relative h-32 w-[68px] shrink-0 overflow-hidden rounded-[10px] border border-pardo bg-pardo/30">
          {url &&
            (isVideoSrc(url) ? (
              <video
                src={url}
                muted
                loop
                autoPlay
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={url} alt={label} className="h-full w-full object-cover" />
            ))}
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="file"
            accept="video/*,image/*"
            onChange={handleFile}
            disabled={disabled || uploading}
            className="text-sm text-bosque/70 file:mr-3 file:rounded-full file:border-0 file:bg-red-wine file:px-4 file:py-2 file:text-sm file:font-semibold file:text-hueso disabled:opacity-50"
          />
          {hint && !uploading && !error && (
            <span className="text-xs text-bosque/60">{hint}</span>
          )}
          {uploading && <span className="text-xs text-bosque/60">Subiendo…</span>}
          {error && <span className="text-xs text-red-wine">{error}</span>}
        </div>
      </div>
      <input type="hidden" name={name} value={url} />
    </div>
  );
}
