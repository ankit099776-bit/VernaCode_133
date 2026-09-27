import pytest
from app.modules.tts.ollama_voice_pack import OllamaVoicePackManager, BUILTIN_VOICE_PACKS, SARVAM_SPEAKER_MAPPING

@pytest.mark.asyncio
async def test_builtin_voice_packs():
    manager = OllamaVoicePackManager()
    
    desc_female = await manager.get_voice_description("female_calm", target_language="sat")
    assert desc_female == BUILTIN_VOICE_PACKS["female_calm"]
    
    desc_male = await manager.get_voice_description("male_expressive", target_language="sat")
    assert desc_male == BUILTIN_VOICE_PACKS["male_expressive"]
    
    desc_teacher = await manager.get_voice_description("teacher_hindi", target_language="hi")
    assert desc_teacher == BUILTIN_VOICE_PACKS["teacher_hindi"]

@pytest.mark.asyncio
async def test_ollama_fallback_when_offline():
    # Pass unreachable URL to force fallback
    manager = OllamaVoicePackManager(ollama_url="http://127.0.0.1:59999")
    
    desc_dynamic_sat = await manager.get_voice_description("ollama_dynamic", target_language="sat")
    assert desc_dynamic_sat == BUILTIN_VOICE_PACKS["female_calm"]
    
    desc_dynamic_hi = await manager.get_voice_description("ollama_dynamic", target_language="hi")
    assert desc_dynamic_hi == BUILTIN_VOICE_PACKS["teacher_hindi"]

def test_sarvam_speaker_mapping():
    manager = OllamaVoicePackManager()
    
    assert manager.get_sarvam_speaker("female_calm") == "ritu"
    assert manager.get_sarvam_speaker("male_expressive") == "arvind"
    assert manager.get_sarvam_speaker("teacher_hindi") == "ritu"
    assert manager.get_sarvam_speaker("teacher_male_hindi") == "arvind"
    assert manager.get_sarvam_speaker("unknown_pack") == "ritu"
