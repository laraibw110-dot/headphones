import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, ShieldAlert, Sparkles, Coffee, Plane, Train, CloudRain, Play, Square, Radio } from "lucide-react";

export const ANCSimulator: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [environment, setEnvironment] = useState<"cafe" | "flight" | "metro" | "rain">("cafe");
  const [ancMode, setAncMode] = useState<"off" | "anc" | "transparency">("anc");
  const [volume, setVolume] = useState<number>(0.5);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Initialize or update Audio Context
  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  const startAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      } else if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;

      // Create 5-second noise buffer
      const bufferSize = ctx.sampleRate * 5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1; // White noise
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      // Filter Node to model environments & ANC filtering
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      applyAcousticSettings(filter, gain, environment, ancMode, volume);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();

      noiseNodeRef.current = noise;
      filterNodeRef.current = filter;
      gainNodeRef.current = gain;

      setIsPlaying(true);
    } catch (err) {
      console.error("Audio Context initialization error:", err);
    }
  };

  const stopAudio = () => {
    if (noiseNodeRef.current) {
      try {
        noiseNodeRef.current.stop();
        noiseNodeRef.current.disconnect();
      } catch (e) {}
      noiseNodeRef.current = null;
    }
    setIsPlaying(false);
  };

  const applyAcousticSettings = (
    filter: BiquadFilterNode,
    gain: GainNode,
    env: string,
    anc: string,
    vol: number
  ) => {
    if (!filter || !gain) return;

    let baseGain = vol;
    let cutoff = 2000;
    let filterType: BiquadFilterType = "lowpass";

    // Setup base environment profiles
    if (env === "flight") {
      cutoff = 400; // Low jet hum
    } else if (env === "cafe") {
      cutoff = 1800; // Mid chatter
    } else if (env === "metro") {
      cutoff = 1200; // Track rumble
    } else if (env === "rain") {
      cutoff = 3000; // High frequency rain
    }

    // Apply ANC Mode Modulation
    if (anc === "anc") {
      // 35dB Active Noise Cancellation lowers ambient gain & cuts harsh rumble
      baseGain = vol * 0.12; // 88% reduction
      cutoff = Math.min(cutoff, 350);
    } else if (anc === "transparency") {
      // Awareness mode preserves vocal midrange (800Hz - 3500Hz)
      filterType = "bandpass";
      cutoff = 1500;
      baseGain = vol * 0.45;
    }

    filter.type = filterType;
    filter.frequency.setTargetAtTime(cutoff, audioCtxRef.current?.currentTime || 0, 0.1);
    gain.gain.setTargetAtTime(baseGain, audioCtxRef.current?.currentTime || 0, 0.1);
  };

  // Update audio when environment or ANC mode changes
  useEffect(() => {
    if (isPlaying && filterNodeRef.current && gainNodeRef.current) {
      applyAcousticSettings(
        filterNodeRef.current,
        gainNodeRef.current,
        environment,
        ancMode,
        volume
      );
    }
  }, [environment, ancMode, volume, isPlaying]);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <section id="anc-simulator" className="py-16 md:py-24 bg-[#1E1E22]/70 backdrop-blur-md text-[#FDFBF7] relative overflow-hidden border-b border-[#38322B]">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E8D8C8]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#38322B] text-[#E8D8C8] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-[#524B42]">
            <Radio className="w-3.5 h-3.5 text-[#E8D8C8] animate-pulse" />
            <span>Interactive Web Audio Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#FDFBF7]">
            Experience AURA 35dB ANC <br />
            <span className="italic font-light text-[#E8D8C8]">Directly in Your Browser</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#A8A096] max-w-xl mx-auto leading-relaxed">
            Toggle between real simulated ambient environments and hear how AURA's adaptive acoustic chambers eliminate jet engine rumble, coffee shop chatter, and metro track noise.
          </p>
        </div>

        {/* Main Interactive Control Panel */}
        <div className="bg-[#2B2B30] border border-[#404048] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 max-w-4xl mx-auto">
          
          {/* Step 1: Select Environment */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#E8D8C8] uppercase tracking-wider block">
              1. Select Ambient Commute Environment:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => setEnvironment("cafe")}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  environment === "cafe"
                    ? "border-[#E8D8C8] bg-[#38322B] text-[#FDFBF7] shadow-lg"
                    : "border-[#404048] bg-[#232327] text-[#A8A096] hover:bg-[#323238]"
                }`}
              >
                <Coffee className="w-6 h-6 text-[#E8D8C8] mb-2" />
                <div>
                  <span className="text-xs font-bold block">Noisy Cafe</span>
                  <span className="text-[10px] opacity-70">Espresso & Chatter</span>
                </div>
              </button>

              <button
                onClick={() => setEnvironment("flight")}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  environment === "flight"
                    ? "border-[#E8D8C8] bg-[#38322B] text-[#FDFBF7] shadow-lg"
                    : "border-[#404048] bg-[#232327] text-[#A8A096] hover:bg-[#323238]"
                }`}
              >
                <Plane className="w-6 h-6 text-[#E8D8C8] mb-2" />
                <div>
                  <span className="text-xs font-bold block">Airplane Cabin</span>
                  <span className="text-[10px] opacity-70">Low Jet Engine Hum</span>
                </div>
              </button>

              <button
                onClick={() => setEnvironment("metro")}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  environment === "metro"
                    ? "border-[#E8D8C8] bg-[#38322B] text-[#FDFBF7] shadow-lg"
                    : "border-[#404048] bg-[#232327] text-[#A8A096] hover:bg-[#323238]"
                }`}
              >
                <Train className="w-6 h-6 text-[#E8D8C8] mb-2" />
                <div>
                  <span className="text-xs font-bold block">City Metro</span>
                  <span className="text-[10px] opacity-70">Subway Rail Noise</span>
                </div>
              </button>

              <button
                onClick={() => setEnvironment("rain")}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  environment === "rain"
                    ? "border-[#E8D8C8] bg-[#38322B] text-[#FDFBF7] shadow-lg"
                    : "border-[#404048] bg-[#232327] text-[#A8A096] hover:bg-[#323238]"
                }`}
              >
                <CloudRain className="w-6 h-6 text-[#E8D8C8] mb-2" />
                <div>
                  <span className="text-xs font-bold block">Focus Rain</span>
                  <span className="text-[10px] opacity-70">Acoustic Relaxation</span>
                </div>
              </button>
            </div>
          </div>

          {/* Step 2: Select ANC Mode Toggle */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#E8D8C8] uppercase tracking-wider block">
              2. Toggle Acoustic Mode:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setAncMode("off")}
                className={`p-4 rounded-2xl border text-center transition-all ${
                  ancMode === "off"
                    ? "border-[#C25B4E] bg-[#3A2220] text-[#FDFBF7] ring-2 ring-[#C25B4E]"
                    : "border-[#404048] bg-[#232327] text-[#A8A096] hover:bg-[#323238]"
                }`}
              >
                <span className="text-xs font-bold block uppercase tracking-wider">ANC OFF</span>
                <span className="text-[11px] block mt-0.5 opacity-80">Full Raw Environment Noise</span>
              </button>

              <button
                onClick={() => setAncMode("anc")}
                className={`p-4 rounded-2xl border text-center transition-all ${
                  ancMode === "anc"
                    ? "border-[#8FAD78] bg-[#263520] text-[#FDFBF7] ring-2 ring-[#8FAD78]"
                    : "border-[#404048] bg-[#232327] text-[#A8A096] hover:bg-[#323238]"
                }`}
              >
                <div className="flex items-center justify-center gap-1.5 text-[#8FAD78]">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-bold block uppercase tracking-wider">SMART 35dB ANC ON</span>
                </div>
                <span className="text-[11px] block mt-0.5 opacity-80">Total Silence & Vocal Clarity</span>
              </button>

              <button
                onClick={() => setAncMode("transparency")}
                className={`p-4 rounded-2xl border text-center transition-all ${
                  ancMode === "transparency"
                    ? "border-[#E8D8C8] bg-[#38322B] text-[#FDFBF7] ring-2 ring-[#E8D8C8]"
                    : "border-[#404048] bg-[#232327] text-[#A8A096] hover:bg-[#323238]"
                }`}
              >
                <span className="text-xs font-bold block uppercase tracking-wider">Awareness Mode</span>
                <span className="text-[11px] block mt-0.5 opacity-80">Pass-Through Voice Mode</span>
              </button>
            </div>
          </div>

          {/* Master Play / Stop & Volume Bar */}
          <div className="pt-6 border-t border-[#404048] flex flex-col sm:flex-row items-center justify-between gap-6">
            <button
              onClick={togglePlay}
              className={`w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm flex items-center justify-center gap-3 shadow-xl transition-all ${
                isPlaying
                  ? "bg-[#C25B4E] hover:bg-[#A8483B] text-[#FDFBF7]"
                  : "bg-[#E8D8C8] hover:bg-[#D4C3B2] text-[#1E1E22]"
              }`}
            >
              {isPlaying ? (
                <>
                  <Square className="w-4 h-4 fill-current" />
                  <span>Stop Simulator</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Live Audio Demo</span>
                </>
              )}
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-3 w-full sm:w-64">
              <VolumeX className="w-4 h-4 text-[#A8A096]" />
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-[#E8D8C8] cursor-pointer"
              />
              <Volume2 className="w-4 h-4 text-[#E8D8C8]" />
            </div>
          </div>

          {/* Acoustic Indicator Bar */}
          <div className="bg-[#1E1E22] p-4 rounded-2xl border border-[#38322B] text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? "bg-[#8FAD78] animate-ping" : "bg-[#8D8276]"}`} />
              <span className="text-[#A8A096]">
                Status: <strong className="text-[#FDFBF7]">{isPlaying ? "Audio Playing Live" : "Paused"}</strong>
              </span>
            </div>
            <span className="text-[#E8D8C8] font-mono text-[11px]">
              {ancMode === "anc" ? "Acoustic Noise Reduction: -35dB" : "Raw Ambient Input"}
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
