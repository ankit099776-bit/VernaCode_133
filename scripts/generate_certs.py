import datetime
import ipaddress
import os
import socket
from cryptography import x509
from cryptography.x509.oid import NameOID
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization

def get_local_ip_addresses():
    ip_list = ["127.0.0.1", "192.168.17.245"]
    try:
        hostname = socket.gethostname()
        local_ip = socket.gethostbyname(hostname)
        if local_ip not in ip_list:
            ip_list.append(local_ip)
    except Exception:
        pass
    
    # Try connecting to external address to discover primary interface IP
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        discovered_ip = s.getsockname()[0]
        s.close()
        if discovered_ip not in ip_list:
            ip_list.append(discovered_ip)
    except Exception:
        pass
    return ip_list

def generate_self_signed_cert(cert_file="cert.pem", key_file="key.pem"):
    print("Generating self-signed SSL/TLS certificate for local LAN HTTPS...")
    key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048,
    )

    subject = issuer = x509.Name([
        x509.NameAttribute(NameOID.COUNTRY_NAME, "IN"),
        x509.NameAttribute(NameOID.STATE_OR_PROVINCE_NAME, "Jharkhand"),
        x509.NameAttribute(NameOID.LOCALITY_NAME, "Classroom"),
        x509.NameAttribute(NameOID.ORGANIZATION_NAME, "BhashaSetu AI"),
        x509.NameAttribute(NameOID.COMMON_NAME, "192.168.17.245"),
    ])

    ips = get_local_ip_addresses()
    san_list = [x509.DNSName("localhost")]
    for ip_str in ips:
        try:
            san_list.append(x509.IPAddress(ipaddress.ip_address(ip_str)))
        except ValueError:
            pass

    print(f"Adding Subject Alternative Names (SAN): {ips} and 'localhost'")

    cert = (
        x509.CertificateBuilder()
        .subject_name(subject)
        .issuer_name(issuer)
        .public_key(key.public_key())
        .serial_number(x509.random_serial_number())
        .not_valid_before(datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(days=1))
        .not_valid_after(datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=3650))
        .add_extension(
            x509.SubjectAlternativeName(san_list),
            critical=False,
        )
        .sign(key, hashes.SHA256())
    )

    with open(key_file, "wb") as f:
        f.write(key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.TraditionalOpenSSL,
            encryption_algorithm=serialization.NoEncryption(),
        ))

    with open(cert_file, "wb") as f:
        f.write(cert.public_bytes(serialization.Encoding.PEM))

    print(f"✅ SSL Certificate created: '{cert_file}'")
    print(f"✅ SSL Private Key created:  '{key_file}'")

if __name__ == "__main__":
    import sys
    if sys.platform == "win32":
        try:
            sys.stdout.reconfigure(encoding="utf-8")
        except Exception:
            pass
    generate_self_signed_cert()
