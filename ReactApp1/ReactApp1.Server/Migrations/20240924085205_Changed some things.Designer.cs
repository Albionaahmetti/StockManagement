﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ReactApp1.Server.Classes;

#nullable disable

namespace ReactApp1.Server.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20240924085205_Changed some things")]
    partial class Changedsomethings
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ReactApp1.Server.Classes.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("InsertionDate")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("ReactApp1.Server.Classes.StockEntry", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("IDProduct")
                        .HasColumnType("int");

                    b.Property<int>("IDUnit")
                        .HasColumnType("int");

                    b.Property<DateTime>("InsertionDate")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("Quantity")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("IDProduct");

                    b.HasIndex("IDUnit");

                    b.ToTable("StockEntries");
                });

            modelBuilder.Entity("ReactApp1.Server.Classes.StockOut", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("IDStockEntry")
                        .HasColumnType("int");

                    b.Property<DateTime>("InsertionDate")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("Quantity")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("IDStockEntry");

                    b.ToTable("StockOut");
                });

            modelBuilder.Entity("ReactApp1.Server.Classes.Unit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("InsertionDate")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Unit");
                });

            modelBuilder.Entity("ReactApp1.Server.Classes.StockEntry", b =>
                {
                    b.HasOne("ReactApp1.Server.Classes.Product", "IdProductNavigation")
                        .WithMany("StockEntries")
                        .HasForeignKey("IDProduct")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ReactApp1.Server.Classes.Unit", "IdUnitNavigation")
                        .WithMany()
                        .HasForeignKey("IDUnit")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("IdProductNavigation");

                    b.Navigation("IdUnitNavigation");
                });

            modelBuilder.Entity("ReactApp1.Server.Classes.StockOut", b =>
                {
                    b.HasOne("ReactApp1.Server.Classes.StockEntry", "IdStockEntryNavigation")
                        .WithMany("StockOuts")
                        .HasForeignKey("IDStockEntry")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("IdStockEntryNavigation");
                });

            modelBuilder.Entity("ReactApp1.Server.Classes.Product", b =>
                {
                    b.Navigation("StockEntries");
                });

            modelBuilder.Entity("ReactApp1.Server.Classes.StockEntry", b =>
                {
                    b.Navigation("StockOuts");
                });
#pragma warning restore 612, 618
        }
    }
}