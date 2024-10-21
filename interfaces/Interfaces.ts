export interface Message {
    id: number;
    text: string;
    isUser: boolean;
  }
  
export  interface CustomMediaRecorder {
    stop: () => void;
}