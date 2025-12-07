import { FileType } from '../types';
import { IMAGE_MIME_TYPES, VIDEO_MIME_TYPES, DOC_MIME_TYPES } from '../constants';

export const determineFileType = (file: File): FileType => {
  if (IMAGE_MIME_TYPES.includes(file.type)) return FileType.IMAGE;
  if (VIDEO_MIME_TYPES.includes(file.type)) return FileType.VIDEO;
  if (DOC_MIME_TYPES.includes(file.type)) return FileType.DOCUMENT;
  
  // Fallback check by extension if mime type is generic or missing
  const name = file.name.toLowerCase();
  if (/\.(jpg|jpeg|png|webp|gif|bmp|svg)$/.test(name)) return FileType.IMAGE;
  if (/\.(mp4|webm|mov|avi|mkv)$/.test(name)) return FileType.VIDEO;
  if (/\.(pdf|doc|docx|txt|json|csv|md)$/.test(name)) return FileType.DOCUMENT;

  return FileType.UNKNOWN;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Real image conversion using Canvas
export const convertImage = async (file: File, formatMimeType: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        ctx.drawImage(img, 0, 0);
        
        // Attempt to convert to the requested mime type
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Conversion failed'));
          }
        }, formatMimeType, 0.9); // 0.9 quality
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

// Text based conversion (JSON <-> CSV)
export const convertTextData = async (file: File, targetFormat: 'json' | 'csv' | 'txt'): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      let output = text;
      let mimeType = 'text/plain';
      
      // Simple mock logic for demonstration of text processing
      if (targetFormat === 'json') {
          mimeType = 'application/json';
          // If it looks like CSV, try to convert (mock)
          if (!text.trim().startsWith('{') && !text.trim().startsWith('[')) {
             const lines = text.split('\n');
             if (lines.length > 0) {
                 const headers = lines[0].split(',');
                 const result = [];
                 for(let i=1;i<lines.length;i++){
                     if (!lines[i].trim()) continue;
                     const obj: any = {};
                     const currentline = lines[i].split(',');
                     // Basic matching of columns
                     for(let j=0;j<headers.length;j++){
                         if (headers[j]) {
                             obj[headers[j].trim()] = currentline[j]?.trim();
                         }
                     }
                     result.push(obj);
                 }
                 output = JSON.stringify(result, null, 2);
             }
          }
      } else if (targetFormat === 'csv') {
          mimeType = 'text/csv';
          try {
              // Try parsing as JSON to convert to CSV
              if (text.trim().startsWith('{') || text.trim().startsWith('[')) {
                  const json = JSON.parse(text);
                  const array = Array.isArray(json) ? json : [json];
                  if (array.length > 0) {
                      const headers = Object.keys(array[0]);
                      const csvRows = [headers.join(',')];
                      for (const row of array) {
                          const values = headers.map(header => {
                              const val = row[header] !== undefined ? row[header] : '';
                              const escaped = ('' + val).replace(/"/g, '\\"');
                              return `"${escaped}"`;
                          });
                          csvRows.push(values.join(','));
                      }
                      output = csvRows.join('\n');
                  }
              }
          } catch (err) {
              console.warn("Could not parse JSON for CSV conversion, returning text");
          }
      }

      resolve(new Blob([output], { type: mimeType }));
    };
    reader.readAsText(file);
  });
};

// Simulated conversion for Video and complex Docs
// Now accepts targetMimeType to ensure the output file has the correct metadata
export const simulateConversion = async (file: File, targetMimeType: string, delayMs = 2000): Promise<Blob> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // CRITICAL FIX: Use .slice() to create a new Blob with the correct MIME type.
      // This is more efficient than new Blob([file]) and strictly sets the type
      // preventing browsers from appending the wrong extension during download.
      const newBlob = file.slice(0, file.size, targetMimeType);
      resolve(newBlob);
    }, delayMs);
  });
};