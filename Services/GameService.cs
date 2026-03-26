using GameVault.Api.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace GameVault.Api.Services;

public class GameService
{
    private readonly IMongoCollection<Game> _gamesCollection;

    public GameService(IConfiguration config)
    {
        // Отримуємо налаштування з appsettings.json
        var client = new MongoClient(config.GetSection("GameStoreDatabase:ConnectionString").Value);
        var database = client.GetDatabase(config.GetSection("GameStoreDatabase:DatabaseName").Value);
        _gamesCollection = database.GetCollection<Game>(config.GetSection("GameStoreDatabase:GamesCollectionName").Value);
    }

    // Отримати всі ігри
    public async Task<List<Game>> GetAsync() =>
        await _gamesCollection.Find(_ => true).ToListAsync();

    // Отримати одну гру за ID (Ось це підкреслювалося)
    public async Task<Game?> GetAsync(string id) =>
        await _gamesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    // Створити нову гру
    public async Task CreateAsync(Game newGame) =>
        await _gamesCollection.InsertOneAsync(newGame);

    // Оновити гру (Ось це підкреслювалося)
    public async Task UpdateAsync(string id, Game updatedGame) =>
        await _gamesCollection.ReplaceOneAsync(x => x.Id == id, updatedGame);

    // Видалити гру (Ось це підкреслювалося)
    public async Task RemoveAsync(string id) =>
        await _gamesCollection.DeleteOneAsync(x => x.Id == id);
}