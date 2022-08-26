namespace hw_monitor_server.Services
{
    public abstract class TimedHostedService : IHostedService, IDisposable
    {
        private Timer? _timer = null;
        private readonly TimeSpan? _interval;

        public TimedHostedService(TimeSpan? interval)
        {
            _interval = interval;
        }

        public Task StartAsync(CancellationToken stoppingToken)
        {
            if (_interval.HasValue) 
            {
                _timer = new Timer(DoWork, null, TimeSpan.Zero,
                    _interval.Value);
            }
            

            return OnStartAsync(stoppingToken);
        }

        protected virtual Task OnStartAsync(CancellationToken stoppingToken)
        {
            return Task.CompletedTask;
        }

        private void DoWork(object? state)
        {
            Execute();
        }

        protected abstract void Execute();

        public Task StopAsync(CancellationToken stoppingToken)
        {
            _timer?.Change(Timeout.Infinite, 0);

            return OnStopAsync(stoppingToken);
        }

        protected virtual Task OnStopAsync(CancellationToken stoppingToken)
        {
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}
