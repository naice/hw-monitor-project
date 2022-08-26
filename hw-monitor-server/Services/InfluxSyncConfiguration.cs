namespace hw_monitor_server.Services
{
    public record InfluxSyncConfiguration
    {
        public const string SectionName = "InfluxSync";

        public bool Enabled { get; set; } = false;
        public int TimeoutInSeconds { get; set; } = 10;

        public string InfluxServer { get; set; } = "http://192.168.178.88:8086";
        public string InfluxDatabase { get; set; } = "pcs";

    }
}
