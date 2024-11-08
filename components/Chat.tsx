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
import { CustomMediaRecorder, Message } from "@/interfaces/Interfaces";
import AvatarSelectionForm from "./AvatarSelectionForm";
import Image from "next/image";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<CustomMediaRecorder | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [responseLoading, setResponseLoading] = useState(false);
  console.log(audioBlob);

  // Avatar states
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const mediaStream = useRef<HTMLVideoElement>(null);
  const avatar = useRef<StreamingAvatar | null>(null);
  const [selectedAvatarId, setSelectedAvatarId] = useState<string>("");
  const introPlayedRef = useRef(false);
  const canStartSession = !!selectedAvatarId;

  const introLines = [
    "Hello! Welcome to your AI Therapy session.",
    "I'm here to assist you with any concerns or questions you might have.",
    "Feel free to type or speak, and I'll respond accordingly.",
  ];

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

  async function speakIntroLines() {
    for (const line of introLines) {
      try {
        if (avatar.current) {
          await avatar.current.speak({
            text: line,
            task_type: TaskType.REPEAT,
          });
        }
      } catch (error) {
        console.error("Error making the avatar speak intro line:", error);
      }
    }
  }

  async function fetchAccessToken() {
    try {
      const response = await fetch(`/api/get-access-token`, { method: "POST" });
      return await response.text();
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
    return "";
  }

  async function startAvatarSession() {
    if (!selectedAvatarId) return; // Ensure avatar is selected
    setIsLoadingSession(true);

    const newToken = await fetchAccessToken();

    avatar.current = new StreamingAvatar({ token: newToken });
    avatar.current.on(StreamingEvents.STREAM_READY, (event) => {
      setStream(event.detail);
    });

    try {
      await avatar.current.createStartAvatar({
        avatarName: selectedAvatarId,
        quality: AvatarQuality.High,
        voice: {
          rate: 1.5,
          emotion: VoiceEmotion.EXCITED,
        },
      });
      setSessionStarted(true);
      if (!introPlayedRef.current) {
        introPlayedRef.current = true;
        speakIntroLines();
      }
    } catch (error) {
      console.error("Error starting avatar session:", error);
    } finally {
      setIsLoadingSession(false);
    }
  }

  async function endSession() {
    await avatar.current?.stopAvatar();
    setStream(undefined);
    setSessionStarted(false);
    setSelectedAvatarId("");
    introPlayedRef.current = false;
  }

  const handleAudioUpload = async (blob: Blob) => {
    const formData = new FormData();
    formData.append("file", blob, "recording.wav");

    try {
      const response = await axios.post(
        "https://iegp3k7uyz.us-east-1.awsapprunner.com/api/upload_audio",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const transcript = response.data.transcript;
      console.log("Transcript:", transcript);
      handleSendMessage(transcript);
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  const handleSendMessage = async (transcript?: string) => {
    if (!sessionStarted) return;
    setResponseLoading(true);

    try {
      const payload = {
        user_id: "123",
        user_query: transcript || inputText.trim(),
      };

      const response = await axios.post(
        "https://iegp3k7uyz.us-east-1.awsapprunner.com/api/generate_response",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
    setResponseLoading(false);
    setAudioBlob(null);
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(1024, 1, 1);

      const chunks: Float32Array[] = [];

      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        chunks.push(new Float32Array(inputData));
      };

      source.connect(processor);
      processor.connect(audioContext.destination);

      setIsRecording(true);

      mediaRecorderRef.current = {
        stop: () => {
          source.disconnect();
          processor.disconnect();
          const audioData = concatenateAudioBuffers(
            chunks,
            audioContext.sampleRate
          );
          const wavBlob = createWavFile(audioData, audioContext.sampleRate);
          setAudioBlob(wavBlob);
          handleAudioUpload(wavBlob);
          setIsRecording(false);
        },
      };
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const concatenateAudioBuffers = (
    buffers: Float32Array[],
    sampleRate: number
  ): Float32Array => {
    const totalLength = buffers.reduce((acc, buffer) => acc + buffer.length, 0);
    const result = new Float32Array(totalLength);
    console.log(sampleRate);
    let offset = 0;
    for (const buffer of buffers) {
      result.set(buffer, offset);
      offset += buffer.length;
    }
    return result;
  };

  const createWavFile = (audioData: Float32Array, sampleRate: number): Blob => {
    const buffer = new ArrayBuffer(44 + audioData.length * 2);
    const view = new DataView(buffer);
    writeString(view, 0, "RIFF");
    view.setUint32(4, 36 + audioData.length * 2, true);
    writeString(view, 8, "WAVE");
    writeString(view, 12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(view, 36, "data");
    view.setUint32(40, audioData.length * 2, true);
    floatTo16BitPCM(view, 44, audioData);

    return new Blob([buffer], { type: "audio/wav" });
  };

  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  const floatTo16BitPCM = (
    output: DataView,
    offset: number,
    input: Float32Array
  ) => {
    for (let i = 0; i < input.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, input[i]));
      output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
  };

  return (
    <div className="flex flex-col h-auto min-h-screen bg-gray-100">
      <div className="md:flex items-center bg-gray-100 px-4 mt-2">
        <div className="mb-4 md:absolute left-4 top-3 cursor-pointer group">
          <Image
            width={100}
            height={100}
            src="/assets/avatar_logo.png"
            alt="avatar_logo"
            className="rounded-full border-4 border-blue-500 shadow-lg group-hover:shadow-2xl"
          />
        </div>
        <div className="flex-1 justify-center">
          <h1 className="text-center text-gray-800 md:text-3xl font-extrabold">
            AI Therapist <span className="text-blue-500">(Beta)</span>
          </h1>
          <p className="text-center text-gray-600 text-sm mt-2">
            Your personalized virtual therapy assistant
          </p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="md:w-[100%] w-[90%] mx-auto my-2 max-h-[80vh]">
          {!stream ? (
            <div className="flex flex-col justify-center items-center h-full">
              <AvatarSelectionForm onSelectAvatar={setSelectedAvatarId} />
              <button
                onClick={startAvatarSession}
                disabled={!canStartSession || isLoadingSession}
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
                  "Start Therapy Session"
                )}
              </button>
            </div>
          ) : (
            <div className="w-full h-full absolute top-[10vh] max-h-[90vh] flex justify-center items-center">
              <video
                ref={mediaStream}
                autoPlay
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              >
                <track kind="captions" />
              </video>
            </div>
          )}
        </div>
      </div>
      {sessionStarted && selectedAvatarId && (
        <div className="flex justify-end md:w-[70%] mx-auto mb-2 z-10">
          <button
            className="bg-gradient-to-tr lg:w-[15%]  from-indigo-500 to-indigo-300  text-white rounded-lg shadow-md px-2 py-2"
            onClick={endSession}
          >
            End session
          </button>
        </div>
      )}
      <div className="md:w-[70%] mx-auto p-2 shadow-lg mb-4 rounded-full bg-gray-200 z-10">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="text-black flex-1 md:text-[20px] text-[15px] bg-gray-200 rounded-full md:px-4 px-2 md:py-2 focus:outline-none"
            placeholder="Type your message..."
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={responseLoading || !sessionStarted}
            className="bg-black text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FaArrowUp size={20} />
          </button>
          <button
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            disabled={responseLoading || !sessionStarted}
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
