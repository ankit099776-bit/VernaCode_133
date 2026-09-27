import os
import wave
import struct
import math

def generate_sample_wav(filename: str = "samples/sample_hindi.wav", text: str = "बच्चों, आज हम गिनती सीखेंगे।"):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    try:
        from gtts import gTTS
        import io

        tts = gTTS(text=text, lang="hi")
        fp = io.BytesIO()
        tts.write_to_fp(fp)
        audio_bytes = fp.getvalue()

        with open(filename, "wb") as f:
            f.write(audio_bytes)
        print(f"Generated real spoken Hindi audio file at: {filename} ({len(audio_bytes)} bytes)")
    except Exception as e:
        # Fallback tone generation
        sample_rate = 16000
        duration_sec = 2.0
        num_samples = int(sample_rate * duration_sec)
        with wave.open(filename, 'wb') as wav_file:
            wav_file.setnchannels(1)
            wav_file.setsampwidth(2)
            wav_file.setframerate(sample_rate)
            frames = bytearray()
            for i in range(num_samples):
                t = i / sample_rate
                amplitude = 0.5 * (1 + math.sin(2 * math.pi * 2 * t))
                sample = int(32767 * amplitude * math.sin(2 * math.pi * 440 * t))
                frames.extend(struct.pack('<h', sample))
            wav_file.writeframes(frames)
        print(f"Fallback sine tone generated at: {filename}")

if __name__ == "__main__":
    generate_sample_wav()
