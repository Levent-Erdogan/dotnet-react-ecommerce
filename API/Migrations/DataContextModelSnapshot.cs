﻿// <auto-generated />
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace API.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.0");

            modelBuilder.Entity("API.Entity.Cart", b =>
                {
                    b.Property<int>("CartId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("CustomerId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("CartId");

                    b.ToTable("Carts");
                });

            modelBuilder.Entity("API.Entity.CartItem", b =>
                {
                    b.Property<int>("CartItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("CartId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ProductId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Quantity")
                        .HasColumnType("INTEGER");

                    b.HasKey("CartItemId");

                    b.HasIndex("CartId");

                    b.HasIndex("ProductId");

                    b.ToTable("CartItem");
                });

            modelBuilder.Entity("API.Entity.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsActive")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<decimal>("Price")
                        .HasColumnType("TEXT");

                    b.Property<int>("Stock")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Products");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "Saat Açıklaması 1",
                            ImageUrl = "1.jpg",
                            IsActive = true,
                            Name = "Apple Watch Series 1",
                            Price = 70000m,
                            Stock = 100
                        },
                        new
                        {
                            Id = 2,
                            Description = "Saat Açıklaması 2",
                            ImageUrl = "2.jpg",
                            IsActive = true,
                            Name = "Apple Watch Series 2",
                            Price = 80000m,
                            Stock = 100
                        },
                        new
                        {
                            Id = 3,
                            Description = "Saat Açıklaması 3",
                            ImageUrl = "3.jpg",
                            IsActive = false,
                            Name = "Apple Watch Series 3",
                            Price = 90000m,
                            Stock = 100
                        },
                        new
                        {
                            Id = 4,
                            Description = "Saat Açıklaması 4",
                            ImageUrl = "4.jpg",
                            IsActive = true,
                            Name = "Xiaomi Redmi Watch 1",
                            Price = 100000m,
                            Stock = 100
                        },
                        new
                        {
                            Id = 5,
                            Description = "Saat Açıklaması 5",
                            ImageUrl = "5.jpg",
                            IsActive = true,
                            Name = "Xiaomi Redmi Watch 2",
                            Price = 100000m,
                            Stock = 100
                        },
                        new
                        {
                            Id = 6,
                            Description = "Saat Açıklaması 6",
                            ImageUrl = "6.jpg",
                            IsActive = true,
                            Name = "Xiaomi Redmi Watch 3",
                            Price = 100000m,
                            Stock = 100
                        },
                        new
                        {
                            Id = 7,
                            Description = "Saat Açıklaması 7",
                            ImageUrl = "7.jpg",
                            IsActive = true,
                            Name = "Xiaomi Redmi Watch 4",
                            Price = 100000m,
                            Stock = 100
                        });
                });

            modelBuilder.Entity("API.Entity.CartItem", b =>
                {
                    b.HasOne("API.Entity.Cart", null)
                        .WithMany("CartItems")
                        .HasForeignKey("CartId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entity.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Product");
                });

            modelBuilder.Entity("API.Entity.Cart", b =>
                {
                    b.Navigation("CartItems");
                });
#pragma warning restore 612, 618
        }
    }
}
