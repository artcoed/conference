using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Conference.Database.EntityFramework
{
    public class EntityFrameworkContextFactory : IDesignTimeDbContextFactory<EntityFrameworkContext>
    {
        public EntityFrameworkContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<EntityFrameworkContext>();
            optionsBuilder.UseSqlServer("");
            return new EntityFrameworkContext(optionsBuilder.Options);
        }
    }
}
