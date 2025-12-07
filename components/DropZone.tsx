import React, { useCallback, useState } from 'react';
import { UploadCloud, FileType, Image, Video, FileText } from 'lucide-react';

interface DropZoneProps {
  onFileAccepted: (file: File) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ onFileAccepted }) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileAccepted(e.dataTransfer.files[0]);
    }
  }, [onFileAccepted]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileAccepted(e.target.files[0]);
    }
  }, [onFileAccepted]);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative group cursor-pointer
        rounded-2xl border-2 border-dashed
        transition-all duration-300 ease-in-out
        flex flex-col items-center justify-center
        h-80 w-full bg-white
        ${isDragActive 
          ? 'border-orange-500 bg-orange-50 scale-[1.01] shadow-xl' 
          : 'border-slate-300 hover:border-orange-400 hover:bg-slate-50 shadow-sm'}
      `}
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileInput}
      />
      
      <div className="flex flex-col items-center space-y-4 text-center p-6">
        <div className={`
          p-5 rounded-full transition-colors duration-300
          ${isDragActive ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-500 group-hover:text-orange-500 group-hover:bg-orange-50'}
        `}>
          <UploadCloud size={48} strokeWidth={1.5} />
        </div>
        
        <div className="space-y-2">
          <p className="text-xl font-semibold text-slate-700 group-hover:text-slate-900">
            Drag & Drop your file here
          </p>
          <p className="text-sm text-slate-400">
            or <span className="text-orange-600 font-medium underline decoration-2 underline-offset-2">browse files</span> to upload
          </p>
        </div>

        <div className="flex items-center space-x-4 pt-4 text-xs text-slate-400 font-medium uppercase tracking-wide">
          <span className="flex items-center"><Image size={14} className="mr-1" /> Images</span>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <span className="flex items-center"><Video size={14} className="mr-1" /> Videos</span>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <span className="flex items-center"><FileText size={14} className="mr-1" /> Documents</span>
        </div>
      </div>
    </div>
  );
};

export default DropZone;
