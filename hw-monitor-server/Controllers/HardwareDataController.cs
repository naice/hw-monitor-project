using hw_monitor_server.Model;
using hw_monitor_server.Services;
using Microsoft.AspNetCore.Mvc;
using OpenHardwareMonitor.Hardware;

namespace hw_monitor_server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VitalsController : Controller
    {
        private readonly IHardwareVitalsService _vitalsService;

        public VitalsController(IHardwareVitalsService vitalsService)
        {
            _vitalsService = vitalsService ?? throw new ArgumentNullException(nameof(vitalsService));
        }


        [HttpGet]
        public HardwareItem Get()
        {
            return _vitalsService.GetVitals();
        }
        
    }
}