using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Conference.Migrations
{
    /// <inheritdoc />
    public partial class VotingState : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "HasVoting",
                table: "Meetings",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasVoting",
                table: "Meetings");
        }
    }
}
