namespace AiSomellierBackend.Models;

public class RecommendationRequest
{
    public string MealType { get; set; } = string.Empty;
    public string Occasion { get; set; } = string.Empty;
    public string Season { get; set; } = string.Empty;
}