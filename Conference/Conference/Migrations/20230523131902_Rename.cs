using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Conference.Migrations
{
    /// <inheritdoc />
    public partial class Rename : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Meetings",
                newName: "MeetingTitle");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MeetingTitle",
                table: "Meetings",
                newName: "Title");
        }
    }
}
