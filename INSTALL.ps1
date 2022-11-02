
dotnet build $PSScriptRoot\hw-monitor-server\hw-monitor-server.csproj --output $PSScriptRoot\bin
npm run deploy --prefix $PSScriptRoot\hw-monitor
$user = "LocalSystem"
Stop-Service -Name hardware-monitor-server
Remove-Service -Name hardware-monitor-server
New-Service -Name hardware-monitor-server -BinaryPathName "$PSScriptRoot\bin\hw-monitor-server.exe --contentRoot $PSScriptRoot\bin" -Credential "$user" -Description "by Jens Marchewka" -DisplayName "Hardware Monitor Server" -StartupType Automatic
Start-Service -Name hardware-monitor-server
# mark as interactive otherwise the service cant get all data (such as temperatures i.e.)
sc config hardware-monitor-server type=own type=interact
pause