using GameVault.Api.Models;
using GameVault.Api.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace GameVault.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    private readonly IMongoCollection<User> _usersCollection;

    public AuthController(AuthService authService, IConfiguration config)
    {
        _authService = authService;
        var client = new MongoClient(config.GetSection("GameStoreDatabase:ConnectionString").Value);
        var database = client.GetDatabase(config.GetSection("GameStoreDatabase:DatabaseName").Value);
        _usersCollection = database.GetCollection<User>(config.GetSection("GameStoreDatabase:UsersCollectionName").Value);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        var existingUser = await _usersCollection.Find(u => u.Username == dto.Username).FirstOrDefaultAsync();
        if (existingUser != null) return BadRequest("Користувач вже існує!");

        var user = new User
        {
            Username = dto.Username,
            PasswordHash = _authService.HashPassword(dto.Password),
            Role = "User" // Звичайний юзер за замовчуванням
        };

        await _usersCollection.InsertOneAsync(user);
        return Ok("Реєстрація успішна!");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _usersCollection.Find(u => u.Username == dto.Username).FirstOrDefaultAsync();
        
        if (user == null || !_authService.VerifyPassword(dto.Password, user.PasswordHash))
        {
            return Unauthorized("Невірний логін або пароль!");
        }

        var token = _authService.GenerateToken(user);
        return Ok(new { token });
    }
}