import urllib.request
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')
boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW'

header = f'--{boundary}\r\nContent-Disposition: form-data; name="audio_file"; filename="sample_hindi.wav"\r\nContent-Type: audio/wav\r\n\r\n'.encode('utf-8')
footer = f'\r\n--{boundary}--\r\n'.encode('utf-8')
audio_bytes = open('samples/sample_hindi.wav', 'rb').read()

payload = header + audio_bytes + footer

req = urllib.request.Request(
    'http://127.0.0.1:8000/api/v1/translate-voice',
    data=payload,
    headers={'Content-Type': f'multipart/form-data; boundary={boundary}'}
)

with urllib.request.urlopen(req) as response:
    data = json.loads(response.read().decode('utf-8'))
    print("STATUS:", data.get("status"))
    print("TRANSCRIPTION:", data.get("transcription"))
    print("TRANSLATION:", data.get("translation"))
    print("ASR PROVIDER:", data.get("asr_provider"))
    print("TTS PROVIDER:", data.get("tts_provider"))
