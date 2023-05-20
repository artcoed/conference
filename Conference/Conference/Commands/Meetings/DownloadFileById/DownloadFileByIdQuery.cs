namespace Conference.Commands.Meetings.DownloadFileById
{
    public record DownloadFileByIdQuery
    {
        public int DocumentId { get; init; }
    }
}
