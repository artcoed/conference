using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Conference.Migrations
{
    /// <inheritdoc />
    public partial class RussianNameRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RussianName",
                table: "Roles",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RussianName",
                table: "Roles");
        }
    }
}
