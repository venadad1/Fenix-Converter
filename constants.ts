import { ConversionFormat, FileType } from './types';

export const SUPPORTED_IMAGE_FORMATS: ConversionFormat[] = [
  { label: 'JPEG Image', value: 'jpeg', mimeType: 'image/jpeg', extension: 'jpg' },
  { label: 'PNG Image', value: 'png', mimeType: 'image/png', extension: 'png' },
  { label: 'WebP Image', value: 'webp', mimeType: 'image/webp', extension: 'webp' },
  { label: 'BMP Image', value: 'bmp', mimeType: 'image/bmp', extension: 'bmp' },
];

export const SUPPORTED_VIDEO_FORMATS: ConversionFormat[] = [
  { label: 'MP4 Video', value: 'mp4', mimeType: 'video/mp4', extension: 'mp4' },
  { label: 'WebM Video', value: 'webm', mimeType: 'video/webm', extension: 'webm' },
  { label: 'AVI Video', value: 'avi', mimeType: 'video/x-msvideo', extension: 'avi' },
  { label: 'MOV Video', value: 'mov', mimeType: 'video/quicktime', extension: 'mov' },
];

export const SUPPORTED_DOC_FORMATS: ConversionFormat[] = [
  { label: 'PDF Document', value: 'pdf', mimeType: 'application/pdf', extension: 'pdf' },
  { label: 'Word Document', value: 'docx', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', extension: 'docx' },
  { label: 'Plain Text', value: 'txt', mimeType: 'text/plain', extension: 'txt' },
  { label: 'JSON Data', value: 'json', mimeType: 'application/json', extension: 'json' },
  { label: 'CSV Data', value: 'csv', mimeType: 'text/csv', extension: 'csv' },
];

export const IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp', 'image/svg+xml'];
export const VIDEO_MIME_TYPES = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo', 'video/mpeg'];
export const DOC_MIME_TYPES = [
  'application/pdf', 
  'text/plain', 
  'application/json', 
  'text/csv',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];
