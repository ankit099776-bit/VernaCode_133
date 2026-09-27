"""
Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ) Transliteration Module
Converts Ol Chiki script text into natural Latin (Romanized) and Devanagari syllabic forms.
"""

CONSONANTS = {
    '\u1c5b': ('t', 'त'), '\u1c5c': ('g', 'ग'), '\u1c5d': ('ng', 'ङ'), '\u1c5e': ('l', 'ल'),
    '\u1c60': ('k', 'क'), '\u1c61': ('j', 'ज'), '\u1c62': ('m', 'म'), '\u1c63': ('w', 'व'),
    '\u1c65': ('s', 'स'), '\u1c66': ('h', 'ह'), '\u1c67': ('ny', 'ञ'), '\u1c68': ('r', 'र'),
    '\u1c6a': ('ch', 'च'), '\u1c6b': ('d', 'द'), '\u1c6c': ('n', 'ण'), '\u1c6d': ('y', 'य'),
    '\u1c6f': ('p', 'प'), '\u1c70': ('d', 'ड'), '\u1c71': ('n', 'न'), '\u1c72': ('r', 'ड़'),
    '\u1c74': ('t', 'ट'), '\u1c75': ('b', 'ब'), '\u1c76': ('w', 'व'), '\u1c77': ('h', 'ह')
}

VOWEL_INDEPENDENT = {
    '\u1c5a': ('o', 'ओ'), '\u1c5f': ('a', 'आ'), '\u1c64': ('i', 'इ'),
    '\u1c69': ('u', 'उ'), '\u1c6e': ('e', 'ए'), '\u1c73': ('o', 'ओ')
}

VOWEL_MATRA = {
    '\u1c5a': ('o', 'ो'), '\u1c5f': ('a', 'ा'), '\u1c64': ('i', 'ि'),
    '\u1c69': ('u', 'ु'), '\u1c6e': ('e', 'े'), '\u1c73': ('o', 'ो')
}

def transliterate_ol_chiki(ol_text: str) -> tuple[str, str]:
    """
    Converts Ol Chiki text into natural Latin (Roman) and Devanagari syllabic forms.
    Returns (latin, devanagari).
    """
    if not ol_text:
        return "", ""

    lat_chars = []
    dev_chars = []
    prev_was_consonant = False

    for c in ol_text:
        if c in CONSONANTS:
            lat_chars.append(CONSONANTS[c][0])
            dev_chars.append(CONSONANTS[c][1])
            prev_was_consonant = True
        elif c in VOWEL_INDEPENDENT:
            lat_chars.append(VOWEL_INDEPENDENT[c][0])
            if prev_was_consonant:
                dev_chars.append(VOWEL_MATRA[c][1])
            else:
                dev_chars.append(VOWEL_INDEPENDENT[c][1])
            prev_was_consonant = False
        elif c in ('\u1c78', '\u1c7a'):  # Mu-Ttudag / nasalization
            lat_chars.append('n')
            dev_chars.append('ँ')
            prev_was_consonant = False
        elif c in ('\u1c79', '\u1c7b', '\u1c7c'):  # Gahla, Ahod, Relay
            prev_was_consonant = False
        elif c == '\u1c7d':  # Ahod connector
            lat_chars.append('-')
            prev_was_consonant = False
        elif c in ('\u1c7e', '\u1c7f'):
            lat_chars.append('.')
            dev_chars.append('।')
            prev_was_consonant = False
        elif 0x1c50 <= ord(c) <= 0x1c7f:
            prev_was_consonant = False
        else:
            lat_chars.append(c)
            dev_chars.append(c)
            prev_was_consonant = False

    latin = ''.join(lat_chars).strip()
    devanagari = ''.join(dev_chars).strip()
    return latin, devanagari
