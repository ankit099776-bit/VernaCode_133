import os
import sys
import ssl
import urllib.request
import asyncio

sys.path.insert(0, os.path.abspath("."))

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

def verify_cert_files():
    print("=" * 80)
    print("VERIFYING LOCAL HTTPS / SSL CERTIFICATES")
    print("=" * 80)

    cert_exists = os.path.exists("cert.pem")
    key_exists = os.path.exists("key.pem")

    print(f"  - Certificate ('cert.pem') exists: {cert_exists}")
    print(f"  - Private Key ('key.pem') exists:   {key_exists}")

    if cert_exists and key_exists:
        print("✅ Self-signed SSL certificate and private key are present!")
        return True
    else:
        print("❌ Certificate files missing!")
        return False

def verify_frontend_security_context():
    print("\n" + "=" * 80)
    print("VERIFYING FRONTEND MICROPHONE SECURITY CONTEXT HANDLERS")
    print("=" * 80)

    for filepath, check_mic in [("static/teacher.html", True), ("static/student.html", False), ("static/index.html", True)]:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        has_media_check = "navigator.mediaDevices" in content
        has_wss_check = "wss:" in content

        print(f"\n[File: {filepath}]")
        print(f"  - Checks navigator.mediaDevices: {has_media_check}")
        print(f"  - Supports WSS (wss://) protocol: {has_wss_check}")
        if check_mic:
            assert has_media_check, f"Missing navigator.mediaDevices check in {filepath}"
        assert has_wss_check, f"Missing WSS protocol check in {filepath}"

    print("\n✅ All frontend UIs properly enforce secure contexts and WSS connections.")

if __name__ == "__main__":
    verify_cert_files()
    verify_frontend_security_context()
