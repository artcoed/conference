﻿namespace Conference.Domain
{
    public class User
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; }
        public List<MeetingUser> MeetingUsers { get; set; }
        public IReadOnlyList<Meeting> Meetings => MeetingUsers.Select(u => u.Meeting)
                                   .ToList();
    }
}
