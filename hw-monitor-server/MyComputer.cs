using Microsoft.Extensions.Options;
using OpenHardwareMonitor.Hardware;

namespace hw_monitor_server
{
    public record MyComputerConfiguration
    {
        public const string KEY = "computer";
        public bool CPUEnabled { get; init; } = true;
        public bool FanControllerEnabled { get; init; } = true;
        public bool GPUEnabled { get; init; } = true;
        public bool HDDEnabled { get; init; } = true;
        public bool MainboardEnabled { get; init; } = true;
        public bool RAMEnabled { get; init; } = true;
    }

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
