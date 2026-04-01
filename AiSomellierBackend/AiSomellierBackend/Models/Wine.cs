namespace AiSomellierBackend.Models;

public class Wine
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty; // e.g., "Rosso", "Bianco", "Rosato"
    public string Description { get; set; } = string.Empty;
    public string Season { get; set; } = string.Empty; // e.g., "Estate", "Inverno"
    public string Intensity { get; set; } = string.Empty; // e.g., "Leggero", "Medio", "Robusto"
}