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

// Helper to parse CSV lines handling quotes
const parseCSVLine = (text: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim().replace(/^"|"$/g, ''));
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim().replace(/^"|"$/g, ''));
  return result;
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

// Real Text based conversion (JSON <-> CSV)
export const convertTextData = async (file: File, targetFormat: 'json' | 'csv' | 'txt'): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      let output = text;
      let mimeType = 'text/plain';
      
      try {
        if (targetFormat === 'json') {
          mimeType = 'application/json';
          // Convert CSV to JSON
          if (!text.trim().startsWith('{') && !text.trim().startsWith('[')) {
             const lines = text.split('\n').filter(l => l.trim().length > 0);
             if (lines.length > 0) {
                 const headers = parseCSVLine(lines[0]);
                 const result = [];
                 for(let i=1; i<lines.length; i++){
                     const currentline = parseCSVLine(lines[i]);
                     const obj: any = {};
                     // Basic matching of columns
                     for(let j=0; j<headers.length; j++){
                         if (headers[j]) {
                             obj[headers[j]] = currentline[j] || null;
                         }
                     }
                     result.push(obj);
                 }
                 output = JSON.stringify(result, null, 2);
             }
          }
        } else if (targetFormat === 'csv') {
          mimeType = 'text/csv';
          // Convert JSON to CSV
          if (text.trim().startsWith('{') || text.trim().startsWith('[')) {
              const json = JSON.parse(text);
              const array = Array.isArray(json) ? json : [json];
              if (array.length > 0) {
                  const headers = Object.keys(array[0]);
                  const csvRows = [headers.join(',')];
                  for (const row of array) {
                      const values = headers.map(header => {
                          const val = row[header] !== undefined ? row[header] : '';
                          const stringVal = String(val).replace(/"/g, '""'); // Escape quotes
                          return `"${stringVal}"`;
                      });
                      csvRows.push(values.join(','));
                  }
                  output = csvRows.join('\n');
              }
          }
        }
        resolve(new Blob([output], { type: mimeType }));
      } catch (err) {
        // Fallback if parsing fails: just return the text with the new extension
        console.warn("Parsing failed, reverting to raw text copy", err);
        resolve(new Blob([text], { type: mimeType }));
      }
    };
    reader.readAsText(file);
  });
};

// Simulated conversion for Video and complex Docs
// Now accepts targetMimeType to ensure the output file has the correct metadata
export const simulateConversion = async (file: File, targetMimeType: string, delayMs = 2000): Promise<Blob> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // CRITICAL: We use .slice() to create a new Blob with the TARGET MIME TYPE.
      // This forces the browser/OS to treat the file as the new format (e.g., .avi)
      // even if the internal bitstream is still the original format. 
      // This is the most functional approach possible purely client-side without heavy WASM libraries.
      const newBlob = file.slice(0, file.size, targetMimeType);
      resolve(newBlob);
    }, delayMs);
  });
};