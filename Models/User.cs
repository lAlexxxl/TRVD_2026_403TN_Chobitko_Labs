using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GameVault.Api.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string Username { get; set; } = null!;
    public string PasswordHash { get; set; } = null!;
    public string Role { get; set; } = "User"; // "User" або "Admin"
}