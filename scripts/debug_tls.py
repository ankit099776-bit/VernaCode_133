import os
import sys
import ssl
import socket
from cryptography import x509
from cryptography.hazmat.primitives import serialization

sys.path.insert(0, os.path.abspath("."))

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

def inspect_cert_and_key():
    print("=" * 80)
    print("1. INSPECTING CERTIFICATE ('cert.pem') AND PRIVATE KEY ('key.pem')")
    print("=" * 80)

    if not os.path.exists("cert.pem") or not os.path.exists("key.pem"):
        print("❌ cert.pem or key.pem does not exist!")
        return False

    try:
        with open("cert.pem", "rb") as f:
            cert_bytes = f.read()
        cert = x509.load_pem_x509_certificate(cert_bytes)

        with open("key.pem", "rb") as f:
            key_bytes = f.read()
        key = serialization.load_pem_private_key(key_bytes, password=None)

        print(f"  - Certificate Subject: {cert.subject}")
        print(f"  - Certificate Issuer:  {cert.issuer}")
        print(f"  - Valid From:          {cert.not_valid_before_utc}")
        print(f"  - Valid To:            {cert.not_valid_after_utc}")

        # Check SAN extension
        san_ext = cert.extensions.get_extension_for_oid(x509.OID_SUBJECT_ALTERNATIVE_NAME)
        san_names = san_ext.value.get_values_for_type(x509.DNSName) + [str(ip) for ip in san_ext.value.get_values_for_type(x509.IPAddress)]
        print(f"  - SAN Entries:         {san_names}")

        # Test loading into Python SSLContext
        ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
        ctx.load_cert_chain(certfile="cert.pem", keyfile="key.pem")
        print("  - SSLContext load_cert_chain: SUCCESS (Cert & Key match!)")
        return True

    except Exception as e:
        print(f"❌ Certificate/Key Error: {e}")
        return False

def check_netstat():
    print("\n" + "=" * 80)
    print("2. CHECKING ACTIVE LISTENING PROCESS ON PORT 8000")
    print("=" * 80)

    import subprocess
    res = subprocess.run(["netstat", "-ano"], capture_output=True, text=True)
    lines = [line for line in res.stdout.splitlines() if ":8000" in line]
    if lines:
        for l in lines:
            print(f"  {l}")
    else:
        print("  No process currently listening on port 8000.")

if __name__ == "__main__":
    inspect_cert_and_key()
    check_netstat()
