using GameVault.Api.Models;
using GameVault.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace GameVault.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GamesController : ControllerBase
{
    private readonly GameService _gameService;

    public GamesController(GameService gameService) =>
        _gameService = gameService;

    [HttpGet]
    public async Task<List<Game>> Get() =>
        await _gameService.GetAsync();

    [HttpPost]
    public async Task<IActionResult> Post(Game newGame)
    {
        await _gameService.CreateAsync(newGame);
        return CreatedAtAction(nameof(Get), new { id = newGame.Id }, newGame);
    }
}