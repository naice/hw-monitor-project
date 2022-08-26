using hw_monitor_server.Model;
using InfluxDB.Collector;
using Microsoft.Extensions.Options;
using System.Reactive.Linq;

namespace hw_monitor_server.Services
{
    public class InfluxSync : TimedHostedService
    {
        private readonly IHardwareVitalsService _vitals;
        private readonly MetricsCollector _metricsCollector;

        private static TimeSpan? GetInterval(IOptions<InfluxSyncConfiguration> config) =>
            config.Value.Enabled ?
                  TimeSpan.FromSeconds(config.Value.TimeoutInSeconds) :
                  null;
        public InfluxSync(IOptions<InfluxSyncConfiguration> config, IHardwareVitalsService vitals) 
            : base(GetInterval(config))
        {
            _vitals = vitals;
            _metricsCollector = new CollectorConfiguration()
                .Tag.With("host", Environment.GetEnvironmentVariable("COMPUTERNAME"))
                .Batch.AtInterval(TimeSpan.FromSeconds(config.Value.TimeoutInSeconds))
                .WriteTo.InfluxDB(config.Value.InfluxServer, config.Value.InfluxDatabase)
                .CreateCollector();
        }

        protected override void Execute()
        {
            var vitals = _vitals.GetVitals();
            if (vitals.Children == null || vitals.Children.Length == 0) 
                return;

            All(vitals, item => Report(item));
        }

        private void Report(HardwareItem item)
        {
            if (item == null) return;
            if (item.Value == null) return;
            _metricsCollector.Write(item.Id, new Dictionary<string, object> {
                { "Value", item.Value },
                { "Name", item.Text },
            });
        }

        private void All(HardwareItem item, Action<HardwareItem> action)
        {
            action(item);
            
            if (item.Children == null || item.Children.Length == 0) return;

            foreach (var i in item.Children)
            {
                All(i, action);
            }
        }
    }
}
