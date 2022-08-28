<?xml version="1.0" ?>
<Task xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task">
    <RegistrationInfo>
        <Date>2022-08-27T00:00:00</Date>
        <Author>Jens Marchewka</Author>
        <Version>1.0.0</Version>
        <Description>hw-monitor-server</Description>
    </RegistrationInfo>
    <Triggers>
        <LogonTrigger>
            <Enabled>true</Enabled>
        </LogonTrigger>
    </Triggers>
    <Principals>
        <Principal>
            <RunLevel>HighestAvailable</RunLevel>
        </Principal>
    </Principals>
    <Settings>
        <Enabled>true</Enabled>
        <AllowStartOnDemand>true</AllowStartOnDemand>
        <AllowHardTerminate>true</AllowHardTerminate>
    </Settings>
    <Actions>
        <Exec>
            <Command>__PATH__bin\hw-monitor-server.exe</Command>
            <WorkingDirectory>__PATH__bin</WorkingDirectory>
        </Exec>
    </Actions>
</Task>