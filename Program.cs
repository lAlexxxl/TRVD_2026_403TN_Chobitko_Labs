using GameVault.Api.Services; // Обов'язково додаємо посилання на наші сервіси

var builder = WebApplication.CreateBuilder(args);

// --- 1. РЕЄСТРАЦІЯ СЕРВІСІВ (Dependency Injection) ---

// Додаємо підтримку контролерів (те, що ми створили в папці Controllers)
builder.Services.AddControllers();

// Реєструємо наш GameService як Singleton (один екземпляр на весь час роботи)
builder.Services.AddSingleton<GameService>();

// Налаштування Swagger (документації API)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// --- 2. НАЛАШТУВАННЯ КОНВЕЄРА (Middleware) ---

// Якщо ми в режимі розробки — вмикаємо Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

// Кажемо програмі шукати маршрути в наших контролерах
app.MapControllers();

app.Run();