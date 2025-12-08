import React, { useRef, useState } from 'react';
import { Upload, X, FileText, Image } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  accept: string;
  label: string;
  onChange: (file: File | null) => void;
  value: File | null;
  type: 'image' | 'pdf';
  error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  label,
  onChange,
  value,
  type,
  error,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (file: File | null) => {
    setFileError(null);
    if (file) {
      // enforce size limits: pdf 2MB, image 1MB
      const maxPdf = 2 * 1024 * 1024;
      const maxImage = 1 * 1024 * 1024;
      if (type === 'pdf' && file.size > maxPdf) {
        setFileError('PDF must be 2MB or smaller');
        onChange(null);
        setPreview(null);
        return;
      }
      if (type === 'image' && file.size > maxImage) {
        setFileError('Image must be 1MB or smaller');
        onChange(null);
        setPreview(null);
        return;
      }
      if (type === 'image') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(file.name);
      }
      onChange(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileChange(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0] || null;
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const clearFile = () => {
    onChange(null);
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div
        className={cn(
          "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden",
          isDragging
            ? "border-primary bg-primary/10"
            : error
            ? "border-destructive bg-destructive/5"
            : "border-border hover:border-primary/50 hover:bg-secondary/30",
          type === 'image' ? "h-32" : "h-24"
        )}
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
        />
        
        {value && preview ? (
          <div className="relative w-full h-full flex items-center justify-center">
            {type === 'image' ? (
              <img
                src={preview}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex items-center gap-2 text-primary">
                <FileText className="w-6 h-6" />
                <span className="text-sm truncate max-w-[150px]">{preview}</span>
              </div>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearFile();
              }}
              className="absolute top-2 right-2 p-1 rounded-full bg-background/80 hover:bg-destructive/20 text-foreground hover:text-destructive transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground p-4">
            {type === 'image' ? (
              <Image className="w-8 h-8" />
            ) : (
              <Upload className="w-8 h-8" />
            )}
            <span className="text-xs text-center">
              Drop {type === 'image' ? 'photo' : 'PDF'} here or click to upload
            </span>
          </div>
        )}
      </div>
      {(error || fileError) && (
        <p className="text-xs text-destructive">{fileError || error}</p>
      )}
    </div>
  );
};

export default FileUpload;
