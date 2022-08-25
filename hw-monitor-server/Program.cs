using hw_monitor_server;
using OpenHardwareMonitor.Hardware;

var corsPolicy = "hw-monitor-cors";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<MyComputerConfiguration>(
    builder.Configuration.GetSection(MyComputerConfiguration.KEY));
builder.Services.AddSingleton<IComputer, MyComputer>();
builder.Services.AddCors(p => p.AddPolicy(corsPolicy, builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(corsPolicy);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
