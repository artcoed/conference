﻿namespace Conference.Domain
{
    public class Note
    {
        public int Id { get; set; }
        public string Value { get; set; }
        public User User { get; set; }
    }
}
