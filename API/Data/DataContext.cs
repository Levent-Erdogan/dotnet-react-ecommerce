using API.Entity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Cart> Carts => Set<Cart>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>().HasData(
            new List<Product> {
                new Product{Id=1,Name ="Apple Watch Series 1",Description="Saat Açıklaması 1",ImageUrl="1.jpg",Price=70000,IsActive=true,Stock=100},
                new Product{Id=2,Name ="Apple Watch Series 2",Description="Saat Açıklaması 2",ImageUrl="2.jpg",Price=80000,IsActive=true,Stock=100},
                new Product{Id=3,Name ="Apple Watch Series 3",Description="Saat Açıklaması 3",ImageUrl="3.jpg",Price=90000,IsActive=false,Stock=100},
                new Product{Id=4,Name ="Xiaomi Redmi Watch 1",Description="Saat Açıklaması 4",ImageUrl="4.jpg",Price=100000,IsActive=true,Stock=100},
                new Product{Id=5,Name ="Xiaomi Redmi Watch 2",Description="Saat Açıklaması 5",ImageUrl="5.jpg",Price=100000,IsActive=true,Stock=100},
                new Product{Id=6,Name ="Xiaomi Redmi Watch 3",Description="Saat Açıklaması 6",ImageUrl="6.jpg",Price=100000,IsActive=true,Stock=100},
                new Product{Id=7,Name ="Xiaomi Redmi Watch 4",Description="Saat Açıklaması 7",ImageUrl="7.jpg",Price=100000,IsActive=true,Stock=100},
            }
        );
    }
}