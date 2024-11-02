export interface Message {
    id: number;
    text: string;
    isUser: boolean;
  }
  
export  interface CustomMediaRecorder {
    stop: () => void;
}


export interface Avatar {
  id: string;
  name: string;
  region: string;
  gender: string;
  age: string;
}