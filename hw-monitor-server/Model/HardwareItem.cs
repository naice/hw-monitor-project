namespace hw_monitor_server.Model
{
    public record HardwareItem
    {
        public string Id { get; set; }
        public string Text { get; set; }
        public HardwareItem[] Children { get; set; }
        public float? Min { get; set; }
        public float? Value { get; set; }
        public float? Max { get; set; }
    }
}
