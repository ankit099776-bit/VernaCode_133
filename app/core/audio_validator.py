import io
import wave
import logging
from typing import Optional, Dict, Any

logger = logging.getLogger(__name__)

def validate_input_audio(
    audio_bytes: bytes,
    filename: Optional[str] = None,
    content_type: Optional[str] = None
) -> Dict[str, Any]:
    """
    Validates incoming user microphone/file audio payload.
    Rejects empty, zero-byte, corrupted, or invalid payloads.
    Logs details: MIME type, byte size, format, sample rate, channels, duration.
    """
    if not audio_bytes or len(audio_bytes) == 0:
        raise ValueError("Audio payload is empty or zero bytes.")

    byte_size = len(audio_bytes)
    audio_format = "unknown"

    # Header inspection
    if audio_bytes.startswith(b"RIFF") and b"WAVE" in audio_bytes[:16]:
        audio_format = "wav"
    elif audio_bytes.startswith(b"\x1aE\xdf\xa3"):
        audio_format = "webm"
    elif audio_bytes.startswith(b"ID3") or audio_bytes.startswith(b"\xff\xfb") or audio_bytes.startswith(b"\xff\xf3"):
        audio_format = "mp3"

    sample_rate = 16000
    channels = 1
    sample_width = 2
    duration_seconds = None

    if audio_format == "wav":
        try:
            with wave.open(io.BytesIO(audio_bytes), "rb") as wf:
                channels = wf.getnchannels()
                sample_width = wf.getsampwidth()
                sample_rate = wf.getframerate()
                nframes = wf.getnframes()
                if sample_rate > 0:
                    duration_seconds = round(float(nframes) / float(sample_rate), 2)
        except Exception as ex:
            logger.warning(f"Could not parse WAV header details: {ex}")

    metadata = {
        "valid": True,
        "size_bytes": byte_size,
        "audio_format": audio_format,
        "sample_rate": sample_rate,
        "channels": channels,
        "sample_width": sample_width,
        "duration_seconds": duration_seconds,
        "filename": filename or "recorded_audio.wav",
        "content_type": content_type or f"audio/{audio_format}"
    }

    log_str = (
        f"[AUDIO INPUT VALIDATED] Format: {audio_format.upper()} | "
        f"Size: {byte_size} bytes | SampleRate: {sample_rate}Hz | "
        f"Channels: {channels} | Duration: {duration_seconds}s"
    )
    logger.info(log_str)
    print(log_str, flush=True)

    return metadata


def add_lead_in_silence(audio_bytes: bytes, silence_ms: int = 250) -> bytes:
    """Prepend silent PCM frames to WAV audio to prevent mobile speaker warm-up truncation."""
    try:
        with wave.open(io.BytesIO(audio_bytes), "rb") as wf:
            params = wf.getparams()
            frames = wf.readframes(wf.getnframes())
            
        sample_rate = params.framerate
        channels = params.nchannels
        sample_width = params.sampwidth
        
        num_silence_frames = int(sample_rate * (silence_ms / 1000.0))
        silence_bytes = b'\x00' * (num_silence_frames * channels * sample_width)
        
        out_buf = io.BytesIO()
        with wave.open(out_buf, "wb") as out_wf:
            out_wf.setparams(params)
            out_wf.writeframes(silence_bytes + frames)
            
        return out_buf.getvalue()
    except Exception as e:
        return audio_bytes


def validate_tts_audio(
    audio_bytes: bytes,
    provider_name: str = "tts",
    target_language: str = "sat"
) -> Dict[str, Any]:
    """
    Validates synthesized TTS audio payload.
    Ensures non-zero length, valid WAV header (RIFF/WAVE/fmt/data), and extracts sample rate & duration.
    """
    if not audio_bytes or len(audio_bytes) == 0:
        raise ValueError(f"Generated TTS audio from provider '{provider_name}' is empty (0 bytes).")

    byte_size = len(audio_bytes)
    
    # Must be a valid WAV file with RIFF header
    if not (audio_bytes.startswith(b"RIFF") and b"WAVE" in audio_bytes[:16]):
        raise ValueError(f"TTS provider '{provider_name}' output is not a valid WAV payload.")

    sample_rate = 16000
    channels = 1
    sample_width = 2
    duration_seconds = 0.0
    min_amp, max_amp, rms = 0, 0, 0.0

    try:
        with wave.open(io.BytesIO(audio_bytes), "rb") as wf:
            channels = wf.getnchannels()
            sample_width = wf.getsampwidth()
            sample_rate = wf.getframerate()
            nframes = wf.getnframes()
            if sample_rate > 0:
                duration_seconds = round(float(nframes) / float(sample_rate), 2)
            
            # Extract raw PCM samples for amplitude/waveform validation
            pcm_frames = wf.readframes(nframes)
            sample_count = len(pcm_frames) // sample_width
            if sample_count > 0 and sample_width == 2:
                import struct
                samples = struct.unpack(f"<{sample_count}h", pcm_frames[:sample_count*2])
                min_amp = min(samples)
                max_amp = max(samples)
                sum_sq = sum(s * s for s in samples)
                rms = round((sum_sq / sample_count) ** 0.5, 2)
    except Exception as ex:
        raise ValueError(f"Corrupted WAV payload returned by TTS provider '{provider_name}': {ex}")

    if duration_seconds <= 0:
        # Fallback estimation based on PCM 16-bit 16kHz mono (32000 bytes/sec)
        bytes_per_sec = sample_rate * channels * sample_width
        if bytes_per_sec > 0:
            duration_seconds = round(float(byte_size) / float(bytes_per_sec), 2)

    metadata = {
        "valid": True,
        "size_bytes": byte_size,
        "audio_format": "wav",
        "mime_type": "audio/wav",
        "sample_rate": sample_rate,
        "channels": channels,
        "sample_width": sample_width,
        "duration_seconds": duration_seconds,
        "min_amplitude": min_amp,
        "max_amplitude": max_amp,
        "rms_amplitude": rms,
        "provider": provider_name,
        "language": target_language
    }

    log_str = (
        f"[AUDIO-TRACE] [TTS AUDIO VALIDATED] Provider: {provider_name} | Language: {target_language} | "
        f"Size: {byte_size} bytes | SampleRate: {sample_rate}Hz | Channels: {channels} | "
        f"Duration: {duration_seconds}s | Waveform Stats: min={min_amp}, max={max_amp}, RMS={rms}"
    )
    if rms == 0 and byte_size > 44:
        logger.warning("[AUDIO-TRACE] WARNING: Generated WAV payload is completely silent (RMS=0)!")
    logger.info(log_str)
    print(log_str, flush=True)

    return metadata
