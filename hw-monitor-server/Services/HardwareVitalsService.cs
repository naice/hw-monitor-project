using hw_monitor_server.Model;
using OpenHardwareMonitor.Hardware;

namespace hw_monitor_server.Services
{
    public interface IHardwareVitalsService
    {
        HardwareItem GetVitals();
    }

    public class HardwareVitalsService : IHardwareVitalsService
    {
        private readonly IComputer _computer;
        private readonly UpdateVisitor _updateVisitor;
        private readonly TimeSpan _debounceTime = TimeSpan.FromSeconds(2);
        private DateTime _lastUpdateTime = DateTime.MinValue;
        private HardwareItem? _hardwareItem = null;

        public HardwareVitalsService(IComputer computer)
        {
            _computer = computer ?? throw new ArgumentNullException(nameof(computer));
            _updateVisitor = new UpdateVisitor();
        }

        public HardwareItem GetVitals()
        {
            if (_hardwareItem != null && DateTime.UtcNow - _lastUpdateTime < _debounceTime)
                return _hardwareItem;

            _lastUpdateTime = DateTime.UtcNow;
            _hardwareItem = BuildComputer(_computer);
            return _hardwareItem;
        }

        private HardwareItem BuildComputer(IComputer computer)
        {
            var items = new List<HardwareItem>();
            computer.Accept(_updateVisitor);
            BuildHardware(items, computer.Hardware);
            var item = new HardwareItem()
            {
                Text = Environment.MachineName,
                Children = items.ToArray(),
            };
            return item;
        }

        private void BuildHardware(List<HardwareItem> result, IHardware[] hardware)
        {
            if (hardware == null) return;

            foreach (var item in hardware)
            {
                result.Add(new HardwareItem()
                {
                    Id = item.Identifier.ToString(),
                    Text = item.Name,
                });
                BuildHardware(result, item.SubHardware);

                foreach (var sensor in item.Sensors)
                {
                    result.Add(new HardwareItem()
                    {
                        Id = sensor.Identifier.ToString(),
                        Text = sensor.Name,
                        Max = sensor.Max,
                        Min = sensor.Min,
                        Value = sensor.Value,
                    });
                }
            }
        }
    }
}
