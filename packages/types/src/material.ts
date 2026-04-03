export type MaterialType = 'pdf' | 'pptx' | 'doc' | 'mp4' | 'mp3' | 'csv' | 'image' | 'url' | 'voice';
export type MaterialStatus = 'uploading' | 'processing' | 'ready' | 'error';

export interface Material {
  id: string;
  userId: string;
  title: string;
  type: MaterialType;
  status: MaterialStatus;
  fileUrl?: string;
  fileSize?: number;
  pageCount?: number;
  chapterCount: number;
  completionPercent: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface Chapter {
  id: string;
  materialId: string;
  title: string;
  index: number;
  summary: string;
  keyConcepts: KeyConcept[];
  completionPercent: number;
  isLocked: boolean;
  createdAt: string;
}

export interface KeyConcept {
  label: string;
  importance: 'primary' | 'secondary';
}

export interface ProcessingStage {
  stage: 'extracting' | 'chunking' | 'analyzing' | 'generating_chapters' | 'building_quizzes' | 'done';
  progress: number;
  estimatedSecondsRemaining?: number;
}
