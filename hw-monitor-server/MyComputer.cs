using Microsoft.Extensions.Options;
using OpenHardwareMonitor.Hardware;

namespace hw_monitor_server
{
    public class MyComputer : Computer
    {
        public MyComputer(IOptions<MyComputerConfiguration> config) : base()
        {
            var c = config.Value;

            CPUEnabled = c.CPUEnabled;
            FanControllerEnabled = c.FanControllerEnabled;
            GPUEnabled = c.GPUEnabled;
            HDDEnabled = c.HDDEnabled;
            MainboardEnabled = c.MainboardEnabled;
            RAMEnabled = c.RAMEnabled;
            
            Open();
        }
    }
}
