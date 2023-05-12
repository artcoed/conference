using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Conference.Migrations
{
    /// <inheritdoc />
    public partial class MeetingsUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MeetingUsers_Meetings_MeetingId",
                table: "MeetingUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_MeetingUsers_Users_UserId",
                table: "MeetingUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MeetingUsers",
                table: "MeetingUsers");

            migrationBuilder.RenameTable(
                name: "MeetingUsers",
                newName: "MeetingsUsers");

            migrationBuilder.RenameIndex(
                name: "IX_MeetingUsers_UserId",
                table: "MeetingsUsers",
                newName: "IX_MeetingsUsers_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_MeetingUsers_MeetingId",
                table: "MeetingsUsers",
                newName: "IX_MeetingsUsers_MeetingId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MeetingsUsers",
                table: "MeetingsUsers",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MeetingsUsers_Meetings_MeetingId",
                table: "MeetingsUsers",
                column: "MeetingId",
                principalTable: "Meetings",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MeetingsUsers_Users_UserId",
                table: "MeetingsUsers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MeetingsUsers_Meetings_MeetingId",
                table: "MeetingsUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_MeetingsUsers_Users_UserId",
                table: "MeetingsUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MeetingsUsers",
                table: "MeetingsUsers");

            migrationBuilder.RenameTable(
                name: "MeetingsUsers",
                newName: "MeetingUsers");

            migrationBuilder.RenameIndex(
                name: "IX_MeetingsUsers_UserId",
                table: "MeetingUsers",
                newName: "IX_MeetingUsers_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_MeetingsUsers_MeetingId",
                table: "MeetingUsers",
                newName: "IX_MeetingUsers_MeetingId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MeetingUsers",
                table: "MeetingUsers",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MeetingUsers_Meetings_MeetingId",
                table: "MeetingUsers",
                column: "MeetingId",
                principalTable: "Meetings",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MeetingUsers_Users_UserId",
                table: "MeetingUsers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
