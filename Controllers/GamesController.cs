using GameVault.Api.Models;
using GameVault.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GameVault.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GamesController : ControllerBase
{
    private readonly GameService _gameService;

    public GamesController(GameService gameService)
    {
        _gameService = gameService;
    }

    // 1. PUBLIC ROUTE: Доступно всім (навіть без токена)
    [HttpGet]
    public async Task<List<Game>> Get() =>
        await _gameService.GetAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Game>> Get(string id)
    {
        var game = await _gameService.GetAsync(id);

        if (game is null)
        {
            return NotFound();
        }

        return game;
    }

    // 2. AUTHENTICATED ROUTE: Доступно тільки з валідним JWT токеном
    [Authorize] 
    [HttpPost]
    public async Task<IActionResult> Post(Game newGame)
    {
        await _gameService.CreateAsync(newGame);
        return CreatedAtAction(nameof(Get), new { id = newGame.Id }, newGame);
    }

    // 3. AUTHENTICATED ROUTE: Редагування також потребує авторизації
    [Authorize]
    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Game updatedGame)
    {
        var game = await _gameService.GetAsync(id);

        if (game is null)
        {
            return NotFound();
        }

        updatedGame.Id = game.Id;
        await _gameService.UpdateAsync(id, updatedGame);

        return NoContent();
    }

    // 4. ADMIN ROUTE: Доступно тільки користувачам з Role = "Admin"
    [Authorize]
    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var game = await _gameService.GetAsync(id);

        if (game is null)
        {
            return NotFound();
        }

        await _gameService.RemoveAsync(id);

        return NoContent();
    }
}