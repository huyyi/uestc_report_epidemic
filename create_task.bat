@ECHO OFF
REM https://msdn.microsoft.com/zh-cn/library/windows/desktop/bb736357(v=vs.85).aspx
SET REPORTCMD="%~dp0report.bat"
SET DMCMD="%~dp0dm.bat"

SET RUN_USER=%USERNAME%
WHOAMI /GROUPS | FIND "12288" > NUL && SET RUN_USER="SYSTEM"

ECHO Create task run as %RUN_USER%
schtasks /Create /SC DAILY /ST 08:00:00 /TR "%REPORTCMD%" /TN "REPORT" /F /RU "%RUN_USER%"
schtasks /Create /SC DAILY /ST 18:00:00 /TR "%DMCMD%" /TN "DM" /F /RU "%RUN_USER%"
PAUSE