$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$site = Join-Path $root "rakeshchaurasia.com"

if (-not (Test-Path -LiteralPath $site)) {
    Write-Error "Site folder not found: $site"
}

Write-Host "Serving: $site"
Write-Host "URL: http://127.0.0.1:8000/rakeshchaurasia.com/"
Write-Host "Keep this window open while using the site."

Set-Location $root
python -m http.server 8000 --bind 127.0.0.1
