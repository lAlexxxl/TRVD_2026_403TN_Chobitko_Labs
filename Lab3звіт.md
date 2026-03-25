Звіт з лабораторної роботи 3

1. Мета роботи
Реалізувати шар доступу до даних, бізнес-логіку та RESTful API для керування списком ігор, використовуючи .NET 8 та MongoDB.
2. Технологічний стек
•	Мова: C# (.NET 8)
•	СКБД: MongoDB (NoSQL)
•	Бібліотеки: MongoDB.Driver, Swashbuckle (Swagger).
________________________________________
3. Фрагменти реалізації коду
3.1 Модель даних (Entity)
Опис структури документа в MongoDB. Файл Models/Game.cs.
C#
public class Game {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string Title { get; set; } = null!;
    public string Genre { get; set; } = null!;
    public int Rating { get; set; }
}
3.2 Сервісний шар (Business Logic)
Клас GameService.cs інкапсулює роботу з драйвером бази даних.
C#
public async Task<List<Game>> GetAsync() => 
    await _gamesCollection.Find(_ => true).ToListAsync();

public async Task CreateAsync(Game newGame) => 
    await _gamesCollection.InsertOneAsync(newGame);
3.3 API Контролер
Файл Controllers/GamesController.cs, що обробляє HTTP-запити.
C#
[HttpGet]
public async Task<List<Game>> Get() => await _gameService.GetAsync();

[HttpPost]
public async Task<IActionResult> Post(Game newGame) {
    await _gameService.CreateAsync(newGame);
    return CreatedAtAction(nameof(Get), new { id = newGame.Id }, newGame);
}
4. Результати тестування (Скриншоти)
Скриншот №1: Загальний вигляд Swagger UI

<img width="643" height="430" alt="изображение" src="https://github.com/user-attachments/assets/0a9dc7ae-e31e-4585-a621-7033b45a65a8" />



Скриншот №2: Додавання гри (POST запит)

<img width="643" height="336" alt="изображение" src="https://github.com/user-attachments/assets/e2058770-7bfc-4c4b-a247-2ea726b9a305" />

  
Скриншот №3: Отримання списку ігор (GET запит)


<img width="643" height="342" alt="изображение" src="https://github.com/user-attachments/assets/4276a892-c05c-4c07-baac-c54a6f828390" />


  ________________________________________
5. Посилання на репозиторій
https://github.com/lAlexxxl/TRVD_2026_403TN_Chobitko_Labs
Висновок
Під час виконання лабораторної роботи було розроблено серверну частину застосунку. Реалізовано архітектурний підхід із розділенням на контролери та сервіси. Використання MongoDB дозволило гнучко оперувати даними без жорстких схем. API успішно протестовано через Swagger, що підтверджує коректність роботи всіх ендпоінтів.
