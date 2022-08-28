using hw_monitor_server;
using hw_monitor_server.Services;
using OpenHardwareMonitor.Hardware;

var corsPolicy = "hw-monitor-cors";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(p => p.AddPolicy(corsPolicy, builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

// MyConfigs
builder.Services.Configure<MyComputerConfiguration>(
    builder.Configuration.GetSection(MyComputerConfiguration.SectionName));
builder.Services.Configure<InfluxSyncConfiguration>(
    builder.Configuration.GetSection(InfluxSyncConfiguration.SectionName));

// MyServices
builder.Services.AddSingleton<IComputer, MyComputer>();
builder.Services.AddSingleton<IHardwareVitalsService, HardwareVitalsService>();
builder.Services.AddHostedService<InfluxSync>();

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
