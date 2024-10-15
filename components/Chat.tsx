// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { Mic, Send, StopCircle } from "lucide-react";
// import { FaArrowUp } from "react-icons/fa6";
// import StreamingAvatar, {
//   AvatarQuality,
//   StreamingEvents,
//   TaskType,
//   VoiceEmotion,
// } from "@heygen/streaming-avatar";

// interface Message {
//   id: number;
//   text: string;
//   isUser: boolean;
// }

// const Chat: React.FC = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputText, setInputText] = useState("");
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Avatar states
//   const [isLoadingSession, setIsLoadingSession] = useState(false);
//   const [stream, setStream] = useState<MediaStream>();
//   const mediaStream = useRef<HTMLVideoElement>(null);
//   const avatar = useRef<StreamingAvatar | null>(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   useEffect(() => {
//     if (stream && mediaStream.current) {
//       mediaStream.current.srcObject = stream;
//       mediaStream.current.onloadedmetadata = () => {
//         mediaStream.current!.play();
//       };
//     }
//   }, [stream]);

//   async function fetchAccessToken() {
//     try {
//       const response = await fetch("/api/get-access-token", {
//         method: "POST",
//       });
//       return await response.text();
//     } catch (error) {
//       console.error("Error fetching access token:", error);
//     }
//     return "";
//   }

//   async function startAvatarSession() {
//     setIsLoadingSession(true);
//     const newToken = await fetchAccessToken();

//     avatar.current = new StreamingAvatar({
//       token: newToken,
//     });
//     avatar.current.on(StreamingEvents.STREAM_READY, (event) => {
//       setStream(event.detail);
//     });

//     try {
//       await avatar.current.createStartAvatar({
//         avatarName: "josh_lite3_20230714",
//         quality: AvatarQuality.Low,
//         voice: {
//           rate: 1.5,
//           emotion: VoiceEmotion.EXCITED,
//         },
//       });
//     } catch (error) {
//       console.error("Error starting avatar session:", error);
//     } finally {
//       setIsLoadingSession(false);
//     }
//   }

//   const handleSendMessage = async () => {
//     if (inputText.trim()) {
//       const newMessage: Message = {
//         id: Date.now(),
//         text: inputText,
//         isUser: true,
//       };
//       setMessages([...messages, newMessage]);

//       if (avatar.current) {
//         try {
//           await avatar.current.speak({
//             text: inputText.trim(),
//             task_type: TaskType.REPEAT,
//           });
//         } catch (error) {
//           console.error("Error sending message to avatar:", error);
//         }
//       }

//       setInputText("");
//     }
//   };

//   const handleStartRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorderRef.current = new MediaRecorder(stream);
//       mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
//         setAudioBlob(event.data);
//       });
//       mediaRecorderRef.current.start();
//       setIsRecording(true);
//     } catch (error) {
//       console.error("Error accessing microphone:", error);
//     }
//   };

//   const handleStopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       <div className="flex-1 flex items-center justify-center">
//         <div className="w-[70%] mx-auto p-4">
//           {!stream ? (
//             <div className="flex justify-center items-center h-full">
//               <button
//                 onClick={startAvatarSession}
//                 disabled={isLoadingSession}
//                 className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isLoadingSession ? (
//                   <div className="flex items-center">
//                     <svg
//                       className="animate-spin h-5 w-5 mr-3"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Starting Session...
//                   </div>
//                 ) : (
//                   "Start Avatar Session"
//                 )}
//               </button>
//             </div>
//           ) : (
//             <div className="w-full h-[500px] flex justify-center items-center">
//               <video
//                 ref={mediaStream}
//                 autoPlay
//                 playsInline
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "contain",
//                 }}
//               >
//                 <track kind="captions" />
//               </video>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="md:w-[70%] mx-auto p-4 shadow-lg mb-4 rounded-full bg-gray-200">
//         <div className="flex items-center space-x-2">
//           <input
//             type="text"
//             value={inputText}
//             onChange={(e) => setInputText(e.target.value)}
//             onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//             className="flex-1 text-[20px] bg-gray-200 rounded-full px-4 py-2 focus:outline-none"
//             placeholder="Type your message..."
//           />
//           <button
//             onClick={handleSendMessage}
//             className="bg-black text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <FaArrowUp size={20} />
//           </button>
//           <button
//             onClick={isRecording ? handleStopRecording : handleStartRecording}
//             className={`${
//               isRecording
//                 ? "bg-red-500 hover:bg-red-600"
//                 : "bg-green-500 hover:bg-green-600"
//             } text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
//           >
//             {isRecording ? <StopCircle size={20} /> : <Mic size={20} />}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;
"use client";
import React, { useState, useRef, useEffect } from "react";
import { Mic, StopCircle } from "lucide-react";
import { FaArrowUp } from "react-icons/fa6";
import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents,
  TaskType,
  VoiceEmotion,
} from "@heygen/streaming-avatar";
import axios from "axios";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  console.log(audioBlob);

  // Avatar states
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const mediaStream = useRef<HTMLVideoElement>(null);
  const avatar = useRef<StreamingAvatar | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (stream && mediaStream.current) {
      mediaStream.current.srcObject = stream;
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current!.play();
      };
    }
  }, [stream]);

  async function fetchAccessToken() {
    try {
      const response = await fetch(
        `${process.env.API_URL}api/get-access-token`,
        {
          method: "POST",
        }
      );
      return await response.text();
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
    return "";
  }

  async function startAvatarSession() {
    setIsLoadingSession(true);
    const newToken = await fetchAccessToken();

    avatar.current = new StreamingAvatar({
      token: newToken,
    });
    avatar.current.on(StreamingEvents.STREAM_READY, (event) => {
      setStream(event.detail);
    });

    try {
      await avatar.current.createStartAvatar({
        avatarName: "josh_lite3_20230714",
        quality: AvatarQuality.Low,
        voice: {
          rate: 1.5,
          emotion: VoiceEmotion.EXCITED,
        },
      });
    } catch (error) {
      console.error("Error starting avatar session:", error);
    } finally {
      setIsLoadingSession(false);
    }
  }

  const handleSendMessage = async () => {
    if (inputText.trim() || audioBlob) {
      // Check if there's either text or audio
      const newMessage: Message = {
        id: Date.now(),
        text: inputText,
        isUser: true,
      };
      setMessages([...messages, newMessage]);

      try {
        // Convert audioBlob to ArrayBuffer if it exists
        let audioData = null;
        if (audioBlob) {
          const arrayBuffer = await audioBlob.arrayBuffer();
          audioData = new Uint8Array(arrayBuffer); // Convert to Uint8Array for sending
        }

        const response = await axios.post(
          "https://npdmpimj2i.us-east-1.awsapprunner.com/api/generate_response",
          {
            user_query: inputText.trim() || null, // Send input text if available
            user_audio: audioData, // Send audio data
            user_id: "123", // Example user ID
          }
        );

        console.log("API Response:", response.data);
        const botResponse = response.data || "No response received";

        const botMessage: Message = {
          id: Date.now(),
          text: botResponse,
          isUser: false,
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);

        if (avatar.current) {
          try {
            await avatar.current.speak({
              text: botResponse,
              task_type: TaskType.REPEAT,
            });
          } catch (error) {
            console.error("Error making the avatar speak:", error);
          }
        }
      } catch (error) {
        console.error("Error sending message to the API:", error);
      }

      setInputText("");
      setAudioBlob(null);
    }
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
        setAudioBlob(event.data);
      });
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 flex items-center justify-center">
        <div className="md:w-[70%] mx-auto p-4">
          {!stream ? (
            <div className="flex justify-center items-center h-full">
              <button
                onClick={startAvatarSession}
                disabled={isLoadingSession}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingSession ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Starting Session...
                  </div>
                ) : (
                  "Start Avatar Session"
                )}
              </button>
            </div>
          ) : (
            <div className="w-full md:h-[500px] h-[300px] flex justify-center items-center">
              <video
                ref={mediaStream}
                autoPlay
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              >
                <track kind="captions" />
              </video>
            </div>
          )}
        </div>
      </div>
      <div className="md:w-[70%] mx-auto p-4 shadow-lg mb-4 rounded-full bg-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 md:text-[20px] text-[15px] bg-gray-200 rounded-full md:px-4 px-2 md:py-2 focus:outline-none"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="bg-black text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FaArrowUp size={20} />
          </button>
          <button
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            className={`${
              isRecording
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            } text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {isRecording ? <StopCircle size={20} /> : <Mic size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
