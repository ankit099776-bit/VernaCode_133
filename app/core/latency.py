import time

class LatencyTracker:
    def __init__(self):
        self.start_time: float = 0.0
        self.end_time: float = 0.0
        self.asr_ms: float = 0.0
        self.translation_ms: float = 0.0
        self.tts_ms: float = 0.0

    def start(self) -> None:
        self.start_time = time.perf_counter()

    def stop(self) -> None:
        self.end_time = time.perf_counter()

    @property
    def total_ms(self) -> float:
        if self.start_time == 0.0 or self.end_time == 0.0:
            return 0.0
        return round((self.end_time - self.start_time) * 1000, 2)

    def record_asr(self, duration_sec: float) -> None:
        self.asr_ms = round(duration_sec * 1000, 2)

    def record_translation(self, duration_sec: float) -> None:
        self.translation_ms = round(duration_sec * 1000, 2)

    def record_tts(self, duration_sec: float) -> None:
        self.tts_ms = round(duration_sec * 1000, 2)

    def to_dict(self) -> dict:
        return {
            "asr_ms": self.asr_ms,
            "translation_ms": self.translation_ms,
            "tts_ms": self.tts_ms,
            "total_ms": self.total_ms
        }
