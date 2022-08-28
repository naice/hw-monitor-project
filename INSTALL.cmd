
@echo off
cls
echo  ::   .: .::    .   .:::   .        :       ...   :::.    :::.:::::::::::::::   ...    :::::::..   
echo  ,;;   ;;,';;,  ;;  ;;;'    ;;,.    ;;;   .;;;;;;;.`;;;;,  `;;;;;;;;;;;;;;''''.;;;;;;;. ;;;;``;;;;  
echo ,[[[,,,[[[ '[[, [[, [['     [[[[, ,[[[[, ,[[     \[[,[[[[[. '[[[[[     [[    ,[[     \[[,[[[,/[[['  
echo "$$$"""$$$   Y$c$$$c$P cccc $$$$$$$$"$$$ $$$,     $$$$$$ "Y$c$$$$$     $$    $$$,     $$$$$$$$$c    
echo  888   "88o   "88"888       888 Y88" 888o"888,_ _,88P888    Y88888     88,   "888,_ _,88P888b "88bo,
echo  MMM    YMM    "M "M"       MMM  M'  "MMM  "YMMMMMP" MMM     YMMMM     MMM     "YMMMMMP" MMMM   "W" 
echo                                                                                by Jens Marchewka
timeout 5
echo.
echo.
echo ###########################
echo ## Build Server
echo ###########################
echo.
echo.
dotnet build %~dp0hw-monitor-server\hw-monitor-server.csproj --output %~dp0bin
echo.
echo.
echo ###########################
echo ## Build Frontend
echo ###########################
echo.
echo.
call npm run deploy --prefix %~dp0hw-monitor
echo.
echo.
echo ###########################
echo ## Create Server Task
echo ###########################
echo.
echo.
powershell -Command "(gc %~dp0server-task.xml.tpl) -replace '__PATH__', '%~dp0' | Out-File %~dp0server-task.xml"
SCHTASKS /delete /TN "hw-monitor-server" /F
SCHTASKS /create /TN "hw-monitor-server" /XML %~dp0server-task.xml
echo.
echo.
echo ###########################
echo ## Done :)
echo ###########################
echo.
echo.
pause