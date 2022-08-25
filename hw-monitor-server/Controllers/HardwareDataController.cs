using hw_monitor_server.Model;
using Microsoft.AspNetCore.Mvc;
using OpenHardwareMonitor.Hardware;

namespace hw_monitor_server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VitalsController : Controller
    {
        private readonly IComputer _computer;
        private readonly UpdateVisitor _updateVisitor;

        public VitalsController(IComputer computer)
        {
            _computer = computer ?? throw new ArgumentNullException(nameof(computer));
            _updateVisitor = new UpdateVisitor();
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


        [HttpGet]
        public HardwareItem Get()
        {
            var computer = BuildComputer(_computer);

            return computer;
        }
        
    }
}