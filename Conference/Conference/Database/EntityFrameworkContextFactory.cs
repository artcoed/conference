using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Conference.Database
{
    public class EntityFrameworkContextFactory : IDesignTimeDbContextFactory<EntityFrameworkContext>
    {
        public EntityFrameworkContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<EntityFrameworkContext>();
            optionsBuilder.UseSqlServer("Server=192.168.147.58;User Id=ws;Password=Qwerty123$;Database=ConferenceClean;Encrypt=false");
            return new EntityFrameworkContext(optionsBuilder.Options);
        }
    }
}
