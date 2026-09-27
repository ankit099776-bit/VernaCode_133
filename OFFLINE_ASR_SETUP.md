# Offline Hindi microphone-to-text setup

This release changes the teacher classroom microphone into a local Hindi
transcription flow. It does not call browser SpeechRecognition, Sarvam, or any
other cloud ASR service.

## One-time connected setup

Run these commands from the project directory while the teacher laptop has
Internet access:

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
py -m pip install --upgrade pip
py -m pip install -r requirements-offline-asr.txt
py scripts\download_offline_asr_model.py
```

The final command stores the Whisper Small CTranslate2 model under
`models/faster-whisper-small`. Keep this folder with the deployed app.

## Offline use

1. Disconnect the laptop from the Internet.
2. Start the teacher server with `python -m uvicorn app.main:app --host 0.0.0.0 --port 8000`.
3. Open `/teacher` on the teacher laptop.
4. Press the microphone button and speak Hindi.
5. After roughly 700 ms of silence, the recording ends automatically and the Hindi
   transcript appears on the teacher screen.

The button can still be pressed a second time to end recording manually.

## Tuning

The browser-side end-of-speech detector is set to roughly 700 ms of silence. Its
two constants are in `static/teacher_classroom.html`:

- `END_OF_SPEECH_MS`: increase it in noisy classrooms or when teachers pause
  often mid-sentence.
- `SPEECH_RMS_THRESHOLD`: increase it if room noise triggers false speech,
  decrease it if quiet speakers are missed.

Use the classroom's real microphone and sample Hindi teacher speech to tune
these values before deployment. This milestone produces local Hindi text only;
offline Hindi-to-Santali translation and Santali speech are the next stages.
