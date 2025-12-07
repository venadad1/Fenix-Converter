export enum FileType {
  IMAGE = 'image',
  VIDEO = 'video',
  DOCUMENT = 'document',
  UNKNOWN = 'unknown'
}

export enum ConversionStatus {
  IDLE = 'idle',
  UPLOADING = 'uploading',
  SELECTED = 'selected',
  CONVERTING = 'converting',
  COMPLETED = 'completed',
  ERROR = 'error'
}

export interface ConversionFormat {
  label: string;
  value: string;
  mimeType: string;
  extension: string;
}

export interface FileData {
  file: File;
  previewUrl: string | null;
  type: FileType;
  originalExtension: string;
  size: number;
}
