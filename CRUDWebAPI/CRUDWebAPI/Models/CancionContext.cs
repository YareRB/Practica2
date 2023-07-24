using Microsoft.EntityFrameworkCore;

namespace CRUDWebAPI.Models
{
    public class CancionContext : DbContext
    {
        public CancionContext(DbContextOptions<CancionContext> options)
            : base(options)
        {

        }

        public DbSet<Cancion> Canciones { get; set; } = null!;
    }
}