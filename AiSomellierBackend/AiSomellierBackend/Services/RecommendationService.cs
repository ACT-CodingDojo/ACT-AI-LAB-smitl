using AiSomellierBackend.Data;
using AiSomellierBackend.Models;

namespace AiSomellierBackend.Services;

public class RecommendationService
{
    private readonly ApplicationDbContext _context;

    public RecommendationService(ApplicationDbContext context)
    {
        _context = context;
    }

    public List<WineRecommendation> GetRecommendations(string mealType, string occasion, string season)
    {
        var wines = _context.Wines.ToList();
        var recommendations = new List<WineRecommendation>();

        // Static rules
        if (mealType.ToLower() == "carne")
        {
            if (season.ToLower() == "inverno")
            {
                var matchingWines = wines.Where(w => w.Type.ToLower().Contains("rosso") && w.Intensity.ToLower() == "robusto").ToList();
                foreach (var wine in matchingWines)
                {
                    recommendations.Add(new WineRecommendation { Wine = wine, Reason = "Ideale per carni rosse invernali" });
                }
            }
            else
            {
                var matchingWines = wines.Where(w => w.Type.ToLower().Contains("rosso") && w.Intensity.ToLower() == "medio").ToList();
                foreach (var wine in matchingWines)
                {
                    recommendations.Add(new WineRecommendation { Wine = wine, Reason = "Buon abbinamento per carni" });
                }
            }
        }
        else if (mealType.ToLower() == "pesce")
        {
            if (season.ToLower() == "estate")
            {
                var matchingWines = wines.Where(w => w.Type.ToLower().Contains("bianco") && w.Intensity.ToLower() == "leggero").ToList();
                foreach (var wine in matchingWines)
                {
                    recommendations.Add(new WineRecommendation { Wine = wine, Reason = "Perfetto per pesce fresco estivo" });
                }
            }
            else
            {
                var matchingWines = wines.Where(w => w.Type.ToLower().Contains("bianco")).ToList();
                foreach (var wine in matchingWines)
                {
                    recommendations.Add(new WineRecommendation { Wine = wine, Reason = "Classico abbinamento con pesce" });
                }
            }
        }
        else if (mealType.ToLower() == "vegetariano")
        {
            var matchingWines = wines.Where(w => w.Type.ToLower().Contains("bianco") || w.Type.ToLower().Contains("rosato")).ToList();
            foreach (var wine in matchingWines)
            {
                recommendations.Add(new WineRecommendation { Wine = wine, Reason = "Adatto per piatti vegetariani" });
            }
        }
        else if (mealType.ToLower() == "dessert")
        {
            var matchingWines = wines.Where(w => w.Type.ToLower().Contains("dolce") || w.Type.ToLower().Contains("spumante")).ToList();
            if (matchingWines.Any())
            {
                foreach (var wine in matchingWines)
                {
                    recommendations.Add(new WineRecommendation { Wine = wine, Reason = "Ideale per dessert" });
                }
            }
            else
            {
                // Fallback
                var fallback = wines.FirstOrDefault();
                if (fallback != null)
                {
                    recommendations.Add(new WineRecommendation { Wine = fallback, Reason = "Suggerimento base, catalogo limitato" });
                }
            }
        }
        else
        {
            // Default
            var defaultWine = wines.FirstOrDefault(w => w.Season.ToLower() == season.ToLower());
            if (defaultWine != null)
            {
                recommendations.Add(new WineRecommendation { Wine = defaultWine, Reason = "Abbinamento stagionale" });
            }
            else
            {
                var fallback = wines.FirstOrDefault();
                if (fallback != null)
                {
                    recommendations.Add(new WineRecommendation { Wine = fallback, Reason = "Suggerimento base" });
                }
            }
        }

        return recommendations.Take(3).ToList(); // Max 3 suggestions
    }
}

public class WineRecommendation
{
    public Wine Wine { get; set; } = null!;
    public string Reason { get; set; } = string.Empty;
}