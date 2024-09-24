using Microsoft.Data.SqlClient;
using ReactApp1.Server.Classes;
using System.Data;
using System.Linq.Expressions;

namespace ReactApp1.Server.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        IEnumerable<T> GetAll();
        T GetById(int id);
        T GetByIdWithNavigations(int id, params Expression<Func<T, object>>[] includeProperties);
        void Add(T entity);
        T AddAndGetEntity(T entity);
        void Update(T entity);
        void Delete(T entity);
        void Save();
        IEnumerable<T> GetAllWithNavigations(params Expression<Func<T, object>>[] includeProperties);
        IEnumerable<T> FindByCriteria(Func<T, bool> predicate,params Expression<Func<T, object>>[]? includeProperties );
        DataTable ExecuteStoredProcedure(string storedProcedureName, params SqlParameter[] parameters);
    }
}
