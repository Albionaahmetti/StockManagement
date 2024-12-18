﻿using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Classes;
using ReactApp1.Server.Interfaces;
using System.Data;
using Dapper;
using System.Linq.Expressions;
using ReactApp1.Server.DTO.Stock;

namespace ReactApp1.Server.Services
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<T> _dbSet;

        public GenericRepository(ApplicationDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public IEnumerable<T> GetAll()
        {
            return _dbSet.ToList();
        }

        public T GetById(int id)
        {
            return _dbSet.Find(id);
        }

        public void Add(T entity)
        {
            _dbSet.Add(entity);
            Save();
        }

        public T AddAndGetEntity(T entity)
        {
            _dbSet.Add(entity);
            Save();
            return entity;
        }

        public void Update(T entity)
        {
            _dbSet.Update(entity);
            _context.Entry(entity).State = EntityState.Modified;
            Save();
        }

        public void Delete(T entity)
        {
            if (_context.Entry(entity).State == EntityState.Detached)
            {
                _dbSet.Attach(entity);
            }
            _dbSet.Remove(entity);
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        public IEnumerable<T> FindByCriteria(Func<T, bool> predicate, params Expression<Func<T, object>>[]? includes)
        {
            IQueryable<T> query = _dbSet;

            if (includes != null && includes.Length > 0)
                foreach (var include in includes)
                    query = query.Include(include);

            return query.Where(predicate).ToList();
        }
        public T GetByIdWithNavigations(int id, params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = _dbSet;

            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }

            return query.FirstOrDefault(e => EF.Property<int>(e, "Id") == id);
        }
        public IEnumerable<T> GetAllWithNavigations(params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = _dbSet;

            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }

            return query.ToList();
        }

        public IEnumerable<T> ExecuteStoredProcedure<T>(string storedProcedureName, params SqlParameter[] parameters)
        {
            try
            {
                using (var connection = _context.Database.GetDbConnection())
                {
                    // Ensure the connection is open
                    if (connection.State != ConnectionState.Open)
                    {
                        connection.Open();
                    }

                    // Use Dapper to execute the stored procedure
                    var result = connection.Query<T>(
                        storedProcedureName,
                        parameters.ToDictionary(p => p.ParameterName, p => p.Value), // Convert SqlParameter[] to a dictionary
                        commandType: CommandType.StoredProcedure
                    ).ToList();

                    return result;
                }
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error executing stored procedure: {ex.Message}");
                throw; // Rethrow the exception
            }
        }



    }
}
