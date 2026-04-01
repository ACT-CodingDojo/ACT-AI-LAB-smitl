using AiSomellierBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace AiSomellierBackend.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Wine> Wines { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed data
        modelBuilder.Entity<Wine>().HasData(
            new Wine { Id = 1, Name = "Chianti", Type = "Rosso", Description = "Vino rosso toscano robusto", Season = "Inverno", Intensity = "Robusto" },
            new Wine { Id = 2, Name = "Pinot Grigio", Type = "Bianco", Description = "Vino bianco fresco e leggero", Season = "Estate", Intensity = "Leggero" },
            new Wine { Id = 3, Name = "Barolo", Type = "Rosso", Description = "Vino rosso piemontese intenso", Season = "Autunno", Intensity = "Robusto" },
            new Wine { Id = 4, Name = "Verdicchio", Type = "Bianco", Description = "Vino bianco marchigiano secco", Season = "Primavera", Intensity = "Medio" },
            new Wine { Id = 5, Name = "Amarone", Type = "Rosso", Description = "Vino rosso veneto corposo", Season = "Inverno", Intensity = "Robusto" },
            new Wine { Id = 6, Name = "Frascati", Type = "Bianco", Description = "Vino bianco laziale fresco", Season = "Estate", Intensity = "Leggero" },
            new Wine { Id = 7, Name = "Sangiovese", Type = "Rosso", Description = "Vino rosso versatile italiano", Season = "Autunno", Intensity = "Medio" },
            new Wine { Id = 8, Name = "Soave", Type = "Bianco", Description = "Vino bianco veneto elegante", Season = "Primavera", Intensity = "Medio" },
            new Wine { Id = 9, Name = "Barbera", Type = "Rosso", Description = "Vino rosso piemontese acidulo", Season = "Estate", Intensity = "Medio" },
            new Wine { Id = 10, Name = "Prosecco", Type = "Spumante", Description = "Vino spumante frizzante", Season = "Primavera", Intensity = "Leggero" },
            new Wine { Id = 11, Name = "Nero d'Avola", Type = "Rosso", Description = "Vino rosso siciliano intenso", Season = "Inverno", Intensity = "Robusto" },
            new Wine { Id = 12, Name = "Vermentino", Type = "Bianco", Description = "Vino bianco sardo aromatico", Season = "Estate", Intensity = "Leggero" },
            new Wine { Id = 13, Name = "Aglianico", Type = "Rosso", Description = "Vino rosso campano tannico", Season = "Autunno", Intensity = "Robusto" },
            new Wine { Id = 14, Name = "Falanghina", Type = "Bianco", Description = "Vino bianco campano fruttato", Season = "Primavera", Intensity = "Medio" },
            new Wine { Id = 15, Name = "Lambrusco", Type = "Rosso Frizzante", Description = "Vino rosso frizzante emiliano", Season = "Estate", Intensity = "Leggero" }
        );
    }
}