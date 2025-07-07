#!/usr/bin/env bash
set -e

# Simple setup script for the Premarket Options dashboard
# Creates a Python virtual environment and optionally starts a local web server.

if ! command -v python3 > /dev/null; then
    echo "Python3 is required but not installed." >&2
    exit 1
fi

if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "Virtual environment created in ./venv" 
fi

if [ "$1" = "--start" ]; then
    source venv/bin/activate
    echo "Starting local server at http://localhost:8000"
    exec python3 -m http.server 8000
else
    echo "Run 'source venv/bin/activate && python3 -m http.server' to start the dashboard." 
fi
