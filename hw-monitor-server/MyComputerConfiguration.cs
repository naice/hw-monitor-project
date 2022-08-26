namespace hw_monitor_server
{
    public record MyComputerConfiguration
    {
        public const string SectionName = "Computer";
        public bool CPUEnabled { get; set; } = true;
        public bool FanControllerEnabled { get; set; } = true;
        public bool GPUEnabled { get; set; } = true;
        public bool HDDEnabled { get; set; } = true;
        public bool MainboardEnabled { get; set; } = true;
        public bool RAMEnabled { get; set; } = true;
    }
}
