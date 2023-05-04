using FluentResults;
using System.Collections.Generic;

namespace Conference.Domain
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var meeting = CreateMeeting();
            var voiting = CreateVoiting();
            var notifications = CreateNotifications(meeting);
            var member = new Member();
            var option = new Option("");
            var notificationString = CreateNotificationString(member);
            var note = CreateNote();
            var decision = new Decision("");

            meeting.AddNote(note);
            meeting.AddVoiting(voiting);
            voiting.Vote(member, option);
            meeting.AddDecision(decision);

            var report = meeting.CreateReport().Value;
        }

        private static Note CreateNote()
        {
            var content = "Надо перестать занимать рабочую машину";
            return new Note(content);
        }

        private static string CreateNotificationString(Member member)
        {
            var notification = member.Notifications.FirstOrDefault();
            return $"{member} приглашен на конференцию ${notification.Meeting}";
        }

        private static List<Notification> CreateNotifications(Meeting meeting)
        {
            var notifications = new List<Notification>();

            foreach (var notifyMember in meeting.Members)
            {
                var notification = new Notification(meeting);
                notifyMember.AddNotification(notification);
                notifications.Add(notification);
            }

            return notifications;
        }

        private static Voiting CreateVoiting()
        {
            var title = "Стоит ли?";

            var options = new List<Option>(new[]
            {
                new Option("Да"),
                new Option("Нет")
            });
            
            return new Voiting(title, options);
        }

        private static Meeting CreateMeeting()
        {
            var startTime = new DateTime(2023, 05, 06);
            
            var questions = new List<Question>(new[]
            {
                new Question("Во что покрасить стену?"),
                new Question("Кого уволить?"),
            });

            var agenda = new Agenda(questions);
            
            var documents = new List<Document>(new[]
            {
                new Document(),
                new Document(),
            });

            var members = new List<Member>(new[]
            {
                new Member(),
                new Member(),
            });

            return new Meeting(startTime, agenda, documents, members);
        }
    }

    public class Meeting
    {
        private List<Member> _members;
        private List<Note> _notes;
        private List<Decision> _decisions;

        public DateTime StartTime { get; }
        public Agenda Agenda { get; }
        public IReadOnlyList<Document> Documents { get; }
        public Voiting Voiting { get; private set; }
        public IReadOnlyList<Note> Notes => _notes;
        public IReadOnlyList<Member> Members => _members;

        public Meeting(DateTime startTime, Agenda agenda, List<Document> documents, List<Member> members)
        {
            StartTime = startTime;
            Agenda = agenda;
            Documents = documents;
            _members = members;
        }

        public Result<Report> CreateReport()
        {
            var startMeetingTime = StartTime;
            var agenda = Agenda;
            var members = _members;
            var notes = _notes;
            var voitingResult = Voiting.GetResult().Value;
            var decisions = _decisions;

            var report = new Report(startMeetingTime, agenda, members, notes, voitingResult, decisions);

            throw new NotImplementedException();
        }

        public Result AddVoiting(Voiting voiting)
        {
            Voiting = voiting;
            throw new NotImplementedException();
        }

        public Result AddNote(Note note)
        {
            throw new NotImplementedException();
        }

        public Result AddDecision(Decision decision)
        {
            throw new NotImplementedException();
        }
    }
}
