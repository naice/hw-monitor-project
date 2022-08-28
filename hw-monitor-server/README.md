# hw-monitor-server
This service can be used under windows to serve hardware vitals via rest api and to collect those metrics in an influxdb

# Install
When the dependencies are installed (.net 6, npm) you can run the INSTALL.cmd script as Administrator to install the 
service via task scheduler. 

# Config
## Computer
    - CPUEnabled true enables CPU vitals
    - FanControllerEnabled true enables fan controller vitals
    - GPUEnabled true enables GPU vitals
    - HDDEnabled true enables HDD vitals
    - MainboardEnabled true enables Mainboard vitals
    - RAMEnabled true enables RAM vitals

## InfluxSync
    - Enabled enables the InfluxSync
    - TimeoutInSeconds sets the timeout between reporting the metrics to Influx.
    - InfluxServer URL to the server
    - InfluxDatabase name of the database to report to.