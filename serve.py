"""
Local Development Web Server for Akshat Dokania's Portfolio.
Run this script using: python serve.py
Automatically serves files and opens your default web browser.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def run():
    global PORT
    for attempt in range(10):
        try:
            with socketserver.TCPServer(("", PORT), Handler) as httpd:
                url = f"http://localhost:{PORT}"
                print("=" * 65)
                print(f"  🚀 Akshat Dokania Portfolio Server Running!")
                print(f"  🌐 URL: {url}")
                print(f"  📁 Serving from: {DIRECTORY}")
                print("  Press Ctrl+C to stop the server")
                print("=" * 65)
                try:
                    webbrowser.open(url)
                except Exception:
                    pass
                httpd.serve_forever()
                break
        except OSError:
            print(f"Port {PORT} in use, trying next port...")
            PORT += 1

if __name__ == "__main__":
    run()
