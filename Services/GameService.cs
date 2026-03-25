using GameVault.Api.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace GameVault.Api.Services;

public class GameService
{
    private readonly IMongoCollection<Game> _gamesCollection;

    public GameService(IConfiguration config)
    {
        // Беремо налаштування з appsettings.json
        var client = new MongoClient(config.GetSection("GameStoreDatabase:ConnectionString").Value);
        var database = client.GetDatabase(config.GetSection("GameStoreDatabase:DatabaseName").Value);
        _gamesCollection = database.GetCollection<Game>(config.GetSection("GameStoreDatabase:CollectionName").Value);
    }

    // Отримати всі ігри
    public async Task<List<Game>> GetAsync() =>
        await _gamesCollection.Find(_ => true).ToListAsync();

    // Додати нову гру
    public async Task CreateAsync(Game newGame) =>
        await _gamesCollection.InsertOneAsync(newGame);
}