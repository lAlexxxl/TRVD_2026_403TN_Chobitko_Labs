using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GameVault.Api.Models;

public class Game
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("Title")]
    public string Title { get; set; } = null!;

    public string Genre { get; set; } = null!;

    public int Rating { get; set; } // Оцінка від 1 до 10
}