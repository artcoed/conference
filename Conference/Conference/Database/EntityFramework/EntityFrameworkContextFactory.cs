using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Conference.Database.EntityFramework
{
    public class EntityFrameworkContextFactory : IDesignTimeDbContextFactory<EntityFrameworkContext>
    {
        public EntityFrameworkContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<EntityFrameworkContext>();
            optionsBuilder.UseNpgsql("Server=localhost;Port=5432;Database=Conference;User Id=postgres;Password=Artem2005!!;");
            return new EntityFrameworkContext(optionsBuilder.Options);
        }
    }
}
