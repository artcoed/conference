using System.ComponentModel.DataAnnotations;

namespace Conference.Domain
{
    public class Document
    {
        public int Id { get; set; }
        [MaxLength]
        public string Value { get; set; }
    }
}
