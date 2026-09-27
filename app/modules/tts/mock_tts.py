import asyncio
import struct
from app.modules.tts.base import BaseTTSProvider, TTSResult

def create_dummy_wav_bytes(duration_ms: int = 500, sample_rate: int = 8000) -> bytes:
    """Generate a minimal valid RIFF/WAV header with silent 16-bit PCM audio."""
    num_samples = int(sample_rate * (duration_ms / 1000.0))
    data_size = num_samples * 2
    file_size = 36 + data_size
    
    header = struct.pack(
        '<4sI4s4sIHHIIHH4sI',
        b'RIFF',
        file_size,
        b'WAVE',
        b'fmt ',
        16,              # Subchunk1Size
        1,               # PCM
        1,               # Mono
        sample_rate,
        sample_rate * 2,
        2,               # BlockAlign
        16,              # BitsPerSample
        b'data',
        data_size
    )
    # Generate audible 440Hz tone PCM 16-bit mono audio
    import math
    samples = []
    freq = 440.0
    for i in range(num_samples):
        t = i / sample_rate
        sample = int(3000 * math.sin(2 * math.pi * freq * t))
        samples.append(struct.pack('<h', sample))
    payload = b''.join(samples)
    return header + payload

class MockTTSProvider(BaseTTSProvider):
    def __init__(self, api_key: str = "mock", voice_id: str = "santhali_female_1"):
        self.api_key = api_key
        self.voice_id = voice_id

    async def synthesize(self, text: str, target_language: str = "sat", voice_pack: str = None, **kwargs) -> TTSResult:
        # Simulate synthesis delay (20ms)
        await asyncio.sleep(0.020)
        audio = create_dummy_wav_bytes(duration_ms=500)
        return TTSResult(
            audio_bytes=audio,
            audio_format="wav",
            provider="mock_tts"
        )
