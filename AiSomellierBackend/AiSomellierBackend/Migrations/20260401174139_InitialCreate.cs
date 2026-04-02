using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AiSomellierBackend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Wines",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Type = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    Season = table.Column<string>(type: "TEXT", nullable: false),
                    Intensity = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Wines", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Wines",
                columns: new[] { "Id", "Description", "Intensity", "Name", "Season", "Type" },
                values: new object[,]
                {
                    { 1, "Vino rosso toscano robusto", "Robusto", "Chianti", "Inverno", "Rosso" },
                    { 2, "Vino bianco fresco e leggero", "Leggero", "Pinot Grigio", "Estate", "Bianco" },
                    { 3, "Vino rosso piemontese intenso", "Robusto", "Barolo", "Autunno", "Rosso" },
                    { 4, "Vino bianco marchigiano secco", "Medio", "Verdicchio", "Primavera", "Bianco" },
                    { 5, "Vino rosso veneto corposo", "Robusto", "Amarone", "Inverno", "Rosso" },
                    { 6, "Vino bianco laziale fresco", "Leggero", "Frascati", "Estate", "Bianco" },
                    { 7, "Vino rosso versatile italiano", "Medio", "Sangiovese", "Autunno", "Rosso" },
                    { 8, "Vino bianco veneto elegante", "Medio", "Soave", "Primavera", "Bianco" },
                    { 9, "Vino rosso piemontese acidulo", "Medio", "Barbera", "Estate", "Rosso" },
                    { 10, "Vino spumante frizzante", "Leggero", "Prosecco", "Primavera", "Spumante" },
                    { 11, "Vino rosso siciliano intenso", "Robusto", "Nero d'Avola", "Inverno", "Rosso" },
                    { 12, "Vino bianco sardo aromatico", "Leggero", "Vermentino", "Estate", "Bianco" },
                    { 13, "Vino rosso campano tannico", "Robusto", "Aglianico", "Autunno", "Rosso" },
                    { 14, "Vino bianco campano fruttato", "Medio", "Falanghina", "Primavera", "Bianco" },
                    { 15, "Vino rosso frizzante emiliano", "Leggero", "Lambrusco", "Estate", "Rosso Frizzante" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Wines");
        }
    }
}
