import React, { useState, useEffect, useRef } from "react";
import {
  Volume2,
  Mic,
  MicOff,
  Radio,
  Wifi,
  WifiOff,
  Sparkles,
  VolumeX,
  Play,
  RotateCw,
  Users,
  MessageSquare,
  CheckCircle2,
  Flame,
  ArrowRight,
  ShieldCheck,
  Headphones,
  Loader2,
  AlertCircle
} from "lucide-react";
import { globalAudioPlayer } from "../services/audioPlayer";
import { playDevanagariAudio } from "../data/bhashaData";

export default function StudentLiveClassroom({
  student,
  isDarkMode = false,
  onBack
}) {
  const safeStudent = (student && student.name) ? student : { name: "ᱨᱚᱵᱤ ᱢᱩᱨᱢᱩ (रवि मुर्मू)", grade: "कक्षा 2" };
  const [roomCode, setRoomCode] = useState("BHASA-204");
  const [inputRoom, setInputRoom] = useState("BHASA-204");
  const [isConnected, setIsConnected] = useState(false);
  const [connectionState, setConnectionState] = useState("connecting"); // connecting, connected, disconnected, error
  const [connectionErrorMsg, setConnectionErrorMsg] = useState("");
  const [teacherConnected, setTeacherConnected] = useState(true);
  const [liveTranscriptions, setLiveTranscriptions] = useState([
    {
      id: "demo_1",
      teacherHindi: "बच्चों, आज हम संथाली वर्णमाला के बारे में पढ़ेंगे।",
      studentSantali: "ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱛᱮᱦᱮᱧ ᱵᱚᱱ ᱥᱟᱱᱛᱟᱲᱤ ᱟᱠᱷᱚᱨ ᱵᱚᱱ ᱯᱟᱲᱦᱟᱣᱟ᱾",
      phonetic: "Gidra ko, tehenj bon santali akhor bon parhawa.",
      timestamp: "10:15 AM",
      isPlaying: false
    }
  ]);
  const [currentSpeech, setCurrentSpeech] = useState(null);
  const [isStudentRecording, setIsStudentRecording] = useState(false);
  const [studentAudioStatus, setStudentAudioStatus] = useState("");
  const [audioState, setAudioState] = useState("idle");

  const socketRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Setup audio player listener
  useEffect(() => {
    globalAudioPlayer.onStateChange = (state) => {
      setAudioState(state);
    };
  }, []);

  // Connect to WebSocket classroom with URL fallback
  const connectToClassroom = (targetRoom = roomCode) => {
    if (socketRef.current) {
      try { socketRef.current.close(); } catch (e) {}
    }

    setConnectionState("connecting");
    setConnectionErrorMsg("");

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const host = window.location.host || "127.0.0.1:8000";
    
    // Candidate WebSocket URLs
    const candidateUrls = [
      `${protocol}//${host}/ws/v1/voice-stream`,
      `${protocol}//${host}/api/v1/ws/v1/voice-stream`,
      `${protocol}//${host}/ws/voice-stream`,
      `wss://localhost:8000/ws/v1/voice-stream`,
      `wss://127.0.0.1:8000/ws/v1/voice-stream`,
      `ws://localhost:8000/ws/v1/voice-stream`,
      `ws://127.0.0.1:8000/ws/v1/voice-stream`
    ];

    let candidateIndex = 0;

    const tryConnect = (url) => {
      try {
        const ws = new WebSocket(url);
        socketRef.current = ws;

        ws.onopen = () => {
          setIsConnected(true);
          setConnectionState("connected");
          setConnectionErrorMsg("");
          ws.send(
            JSON.stringify({
              action: "join_room",
              room_code: targetRoom,
              role: "student"
            })
          );
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === "room_status") {
              setTeacherConnected(data.teacher_connected !== false);
            } else if (data.type === "text_translation" || data.event === "text_translation") {
              const santaliText = data.translation || data.devanagari || data.latin || "";
              const newEntry = {
                id: data.request_id || "tx_" + Date.now(),
                teacherHindi: data.transcription || "",
                studentSantali: santaliText,
                phonetic: data.latin || data.devanagari || "",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              };
              setCurrentSpeech(newEntry);
              setLiveTranscriptions((prev) => [newEntry, ...prev.slice(0, 15)]);

              // Speak in Santali for student
              if (santaliText) {
                playDevanagariAudio(santaliText, "sat");
              }
            } else if (data.type === "voice_translation" || data.event === "voice_translation") {
              const santaliText = data.translation || data.devanagari || data.latin || "";
              const newEntry = {
                id: data.request_id || "vx_" + Date.now(),
                teacherHindi: data.transcription || "",
                studentSantali: santaliText,
                phonetic: data.latin || data.devanagari || "",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              };
              setCurrentSpeech(newEntry);
              setLiveTranscriptions((prev) => [newEntry, ...prev.slice(0, 15)]);
              
              if (data.audio_base64 && data.target_language === "sat") {
                globalAudioPlayer.playBase64Audio(data);
              } else if (santaliText) {
                playDevanagariAudio(santaliText, "sat");
              }
            }
          } catch (err) {
            console.error("WS Parse Error:", err);
          }
        };

        ws.onerror = (err) => {
          candidateIndex++;
          if (candidateIndex < candidateUrls.length) {
            tryConnect(candidateUrls[candidateIndex]);
          } else {
            setConnectionState("disconnected");
            setIsConnected(false);
            setConnectionErrorMsg("सर्वर कनेक्ट करने में परेशानी (Server disconnected). offline fallback mode active.");
          }
        };

        ws.onclose = () => {
          setIsConnected(false);
          setConnectionState("disconnected");
        };
      } catch (e) {
        setConnectionState("disconnected");
        setIsConnected(false);
        setConnectionErrorMsg(e.message || "WebSocket Connection Exception");
      }
    };

    tryConnect(candidateUrls[0]);
  };

  const micStreamRef = useRef(null);

  useEffect(() => {
    connectToClassroom(roomCode);

    // Pre-warm mic stream in background so recording starts instantly without initial latency cutoff
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
      }).then((stream) => {
        micStreamRef.current = stream;
      }).catch((e) => {
        console.log("Mic pre-warm silent notice:", e);
      });
    }

    return () => {
      if (socketRef.current) {
        try { socketRef.current.close(); } catch (e) {}
      }
      if (micStreamRef.current) {
        try { micStreamRef.current.getTracks().forEach((track) => track.stop()); } catch (e) {}
      }
    };
  }, [roomCode]);

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (inputRoom.trim()) {
      const cleanRoom = inputRoom.trim().toUpperCase();
      setRoomCode(cleanRoom);
      connectToClassroom(cleanRoom);
    }
  };

  const startStudentRecording = async () => {
    try {
      let stream = micStreamRef.current;
      if (!stream || !stream.active) {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
        });
        micStreamRef.current = stream;
      }

      audioChunksRef.current = [];
      const options = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? { mimeType: "audio/webm;codecs=opus" }
        : {};
      
      const recorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (evt) => {
        if (evt.data && evt.data.size > 0) {
          audioChunksRef.current.push(evt.data);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64Audio = reader.result.split(",")[1];
          if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(
              JSON.stringify({
                action: "translate_audio",
                room_code: roomCode,
                role: "student",
                direction: "student_to_teacher",
                source_language: "sat",
                target_language: "hi",
                audio_base64: base64Audio
              })
            );
            setStudentAudioStatus("ᱥᱤᱠᱷᱚᱠ ᱴᱷᱮᱱ ᱠᱩᱞ ᱮᱱᱟ! (शिक्षक को भेजा गया)");
            setTimeout(() => setStudentAudioStatus(""), 3500);
          }
        };
      };

      // Start recording immediately with 100ms timeslice to capture beginning words without truncation
      recorder.start(100);
      setIsStudentRecording(true);
    } catch (err) {
      console.error("Mic error:", err);
      alert("माइक्रोफ़ोन अनुमति आवश्यक है।");
    }
  };

  const stopStudentRecording = () => {
    if (mediaRecorderRef.current && isStudentRecording) {
      mediaRecorderRef.current.stop();
      setIsStudentRecording(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] dark:bg-[#0A1610] text-stone-800 dark:text-[#E8F3ED] font-sans p-4 sm:p-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-forest-800 via-forest-700 to-emerald-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-emerald-400/20 border border-emerald-300/30 text-emerald-200 text-xs font-bold flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                  ᱞᱟᱭᱤᱵᱽ ᱪᱟᱱᱟᱪ (लाइव कक्षा)
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold">
                  {roomCode}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-amber-300">
                ᱥᱟᱱᱛᱟᱲᱤ ᱞᱟᱭᱤᱵᱽ ᱟᱸᱡᱚᱢ (Santali Classroom Audio)
              </h1>
              <p className="text-emerald-100 text-sm mt-1">
                शिक्षक जो भी हिंदी में बोलेंगे, आपको तुरंत संथाली (Ol Chiki) और सुरीली आवाज़ में सुनाई देगा।
              </p>
            </div>

            {/* Room Join Box */}
            <form onSubmit={handleJoinRoom} className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20">
              <input
                type="text"
                value={inputRoom}
                onChange={(e) => setInputRoom(e.target.value)}
                placeholder="BHASA-204"
                className="w-28 px-3 py-1.5 rounded-xl bg-white/20 text-white placeholder-emerald-200 text-sm font-black tracking-wider focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-forest-950 font-black text-xs transition-colors cursor-pointer shadow-md"
              >
                ᱡᱚᱲᱟᱣ (Join)
              </button>
            </form>
          </div>

          {/* Connection Status Sub-bar */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              {connectionState === "connecting" && (
                <span className="flex items-center gap-1.5 text-amber-300 font-bold animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  ᱠᱞᱟᱥ ᱥᱟᱶ ᱡᱚᱲᱟᱣᱚᱜ ᱠᱟᱱᱟ... (कक्षा से कनेक्ट हो रहा है...)
                </span>
              )}

              {connectionState === "connected" && (
                <span className="flex items-center gap-1.5 text-emerald-300 font-bold">
                  <Wifi className="w-4 h-4 text-emerald-400 animate-pulse" />
                  ᱚᱱᱞᱟᱭᱤᱱ ᱡᱚᱲᱟᱣ ᱢᱮᱱᱟᱜᱼᱟ (ऑनलाइन कनेक्टेड)
                </span>
              )}

              {connectionState === "disconnected" && (
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-rose-300 font-bold">
                    <WifiOff className="w-4 h-4 text-rose-400" />
                    ᱡᱚᱲᱟᱣ ᱵᱟᱹᱱᱩᱜᱼᱟ (कनेक्शन विच्छेद)
                  </span>
                  <button
                    onClick={() => connectToClassroom(roomCode)}
                    className="px-3 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-black transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCw className="w-3 h-3" />
                    <span>पुनः कनेक्ट करें (Retry)</span>
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-emerald-200">
              <Users className="w-4 h-4" />
              <span>शिक्षक स्थिति: {teacherConnected ? "🟢 कक्षा चालू है" : "🟡 शिक्षक प्रतीक्षा कर रहे हैं"}</span>
            </div>
          </div>

          {connectionErrorMsg && (
            <div className="mt-3 p-2.5 rounded-xl bg-rose-500/20 border border-rose-400/30 text-rose-200 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{connectionErrorMsg}</span>
            </div>
          )}
        </div>

        {/* Current Live Broadcast Main Display Card */}
        <div className="bg-white dark:bg-[#12241A] rounded-3xl p-6 border-2 border-amber-300/60 dark:border-emerald-700/50 shadow-lg relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500 animate-spin" />
              <h2 className="text-lg font-black text-stone-900 dark:text-white">
                ᱱᱤᱛᱚᱜᱟᱜ ᱟᱸᱡᱚᱢ (हालिया उच्चारण & ऑडियो)
              </h2>
            </div>
            {audioState === "playing" && (
              <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5 border border-emerald-300">
                <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                ᱚᱰᱤᱭᱳ ᱪᱟᱹᱞᱩ ᱢᱮᱱᱟᱜᱼᱟ (Audio Playing...)
              </span>
            )}
          </div>

          {currentSpeech ? (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-[#183224] dark:to-[#1B3A2A] rounded-2xl p-5 border border-amber-200 dark:border-emerald-800/60 shadow-inner">
                <div className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-1">
                  ᱥᱟᱱᱛᱟᱲᱤ (Santali Ol Chiki):
                </div>
                <div className="text-2xl sm:text-3xl font-black text-forest-900 dark:text-emerald-200 leading-snug tracking-wide">
                  {currentSpeech.studentSantali}
                </div>
                {currentSpeech.phonetic && (
                  <div className="text-sm font-medium text-stone-600 dark:text-stone-400 mt-2 italic">
                    Phonetic: {currentSpeech.phonetic}
                  </div>
                )}
              </div>

              <div className="bg-stone-50 dark:bg-[#14291E] rounded-2xl p-4 border border-stone-200 dark:border-[#204231]">
                <div className="text-xs font-bold text-stone-500 dark:text-stone-400 mb-1">
                  शिक्षक का हिंदी वाक्य:
                </div>
                <div className="text-base sm:text-lg font-bold text-stone-800 dark:text-stone-200">
                  "{currentSpeech.teacherHindi}"
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    if (currentSpeech && currentSpeech.studentSantali) {
                      playDevanagariAudio(currentSpeech.studentSantali, "sat");
                    } else {
                      globalAudioPlayer.replay();
                    }
                  }}
                  className="px-5 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <Volume2 className="w-5 h-5 text-amber-300" />
                  <span>🔊 ᱚᱰᱤᱭᱚ ᱟᱸᱡᱚᱢ (Santali Audio Replay)</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-stone-400 dark:text-stone-500">
              <Headphones className="w-12 h-12 mx-auto mb-3 opacity-40 animate-pulse text-forest-600" />
              <p className="text-sm font-bold">
                शिक्षक के बोलने की प्रतीक्षा की जा रही है...
              </p>
              <p className="text-xs mt-1">
                जैसे ही कक्षा में पढ़ाया जाएगा, यहाँ संथाली आवाज़ और टेक्स्ट दिखाई देगा।
              </p>
            </div>
          )}
        </div>

        {/* Student Voice Interaction */}
        <div className="bg-white dark:bg-[#12241A] rounded-3xl p-6 border border-stone-200 dark:border-[#1E3C2C] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-base font-black text-stone-900 dark:text-white flex items-center gap-2">
                <Mic className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ᱥᱤᱠᱷᱚᱠ ᱴᱷᱮᱱ ᱨᱚᱲ ᱢᱮ (शिक्षक से उत्तर दें / सवाल पूछें)
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                माइक बटन दबाकर संथाली में बोलें, शिक्षक को हिंदी में अनुवाद पहुंचेगा।
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            {!isStudentRecording ? (
              <button
                onClick={startStudentRecording}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Mic className="w-5 h-5" />
                <span>🎤 ᱨᱚᱲ ᱮᱦᱚᱵ (Start Speaking)</span>
              </button>
            ) : (
              <button
                onClick={stopStudentRecording}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm flex items-center justify-center gap-2 transition-all shadow-md animate-pulse cursor-pointer"
              >
                <MicOff className="w-5 h-5" />
                <span>⏹️ ᱨᱚᱲ ᱢᱩᱪᱟᱹᱫ (Stop & Send)</span>
              </button>
            )}

            {studentAudioStatus && (
              <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-4 py-2 rounded-xl border border-emerald-200">
                {studentAudioStatus}
              </div>
            )}
          </div>
        </div>

        {/* Live Classroom History Stream */}
        <div className="bg-white dark:bg-[#12241A] rounded-3xl p-6 border border-stone-200 dark:border-[#1E3C2C] shadow-sm">
          <h3 className="text-base font-black text-stone-900 dark:text-white mb-4 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-forest-700 dark:text-emerald-400" />
            <span>ᱪᱟᱱᱟᱪ ᱠᱟᱛᱷᱟ (कक्षा इतिहास सूची)</span>
          </h3>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {liveTranscriptions.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-stone-50 dark:bg-[#152B1F] border border-stone-200/80 dark:border-[#224734] flex flex-col gap-1 transition-hover hover:border-amber-400"
              >
                <div className="flex items-center justify-between text-xs text-stone-400 font-bold">
                  <span>{item.timestamp}</span>
                  <span className="text-emerald-600 dark:text-emerald-400">Ol Chiki Broadcast</span>
                </div>
                <div className="text-lg font-black text-forest-900 dark:text-emerald-300">
                  {item.studentSantali}
                </div>
                <div className="text-xs text-stone-600 dark:text-stone-300 font-medium">
                  {item.teacherHindi}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
