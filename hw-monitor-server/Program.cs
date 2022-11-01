using hw_monitor_server;
using hw_monitor_server.Services;
using Microsoft.Extensions.Hosting.WindowsServices;
using OpenHardwareMonitor.Hardware;

var corsPolicy = "hw-monitor-cors";
var options = new WebApplicationOptions
{
    Args = args,
    ContentRootPath = WindowsServiceHelpers.IsWindowsService()
                                     ? AppContext.BaseDirectory : default
};
var builder = WebApplication.CreateBuilder(options);
var services = builder.Services;
var host = builder.Host;
// Add services to the container
services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();
services.AddCors(p => p.AddPolicy(corsPolicy, builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

// MyConfigs
services.Configure<MyComputerConfiguration>(
    builder.Configuration.GetSection(MyComputerConfiguration.SectionName));
services.Configure<InfluxSyncConfiguration>(
    builder.Configuration.GetSection(InfluxSyncConfiguration.SectionName));

// MyServices
services.AddSingleton<IComputer, MyComputer>();
services.AddSingleton<IHardwareVitalsService, HardwareVitalsService>();
services.AddHostedService<InfluxSync>();

host.UseWindowsService();                  
                                                                                     
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(corsPolicy);

app.UseDefaultFiles();

app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
