"use client";

import Image from "next/image";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const BUCKET = "site-images";

export default function ImageField({
  name,
  label,
  defaultValue,
  disabled,
}: {
  name: string;
  label: string;
  defaultValue: string;
  disabled?: boolean;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");

    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${name.replace(/\./g, "-")}-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { upsert: true, cacheControl: "3600" });
      if (upErr) throw upErr;

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      setUrl(data.publicUrl);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo subir la imagen."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[13px] font-semibold text-bosque">{label}</span>
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[10px] border border-pardo bg-pardo/30">
          {url && (
            <Image src={url} alt={label} fill sizes="80px" className="object-cover" />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            disabled={disabled || uploading}
            className="text-sm text-bosque/70 file:mr-3 file:rounded-full file:border-0 file:bg-red-wine file:px-4 file:py-2 file:text-sm file:font-semibold file:text-hueso disabled:opacity-50"
          />
          {uploading && <span className="text-xs text-bosque/60">Subiendo…</span>}
          {error && <span className="text-xs text-red-wine">{error}</span>}
        </div>
      </div>
      <input type="hidden" name={name} value={url} />
    </div>
  );
}
