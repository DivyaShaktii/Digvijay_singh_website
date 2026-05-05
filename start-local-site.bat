@echo off
cd /d "%~dp0"
echo Serving: %cd%\rakeshchaurasia.com
echo URL: http://127.0.0.1:8000/rakeshchaurasia.com/
echo Keep this window open while using the site.
python -m http.server 8000 --bind 127.0.0.1
pause
