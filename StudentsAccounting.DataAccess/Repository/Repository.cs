using Microsoft.EntityFrameworkCore;
using StudentsAccounting.DataAccess.Context;
using StudentsAccounting.DataAccess.Interfaces;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace StudentsAccounting.DataAccess.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly DbContext _context;
        private readonly DbSet<T> _set;

        public Repository(StudentsAccountingDbContext context)
        {
            _context = context;
            _set = _context.Set<T>();
        }

        public void Add(T entity)
        {
            _set.Add(entity);
            _context.SaveChangesAsync();
        }

        public void Delete(T entity)
        {
            _set.Remove(entity);
            _context.SaveChanges();
        }

        public void Edit(T entity)
        {
            _set.Update(entity);
            _context.SaveChanges();
        }

        public IQueryable<T> GetAllQueryable()
        {
            return _set.AsQueryable();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _set.FindAsync(id);
        }

        public async Task<T> GetSingleAsync(Expression<Func<T, bool>> predicate)
        {
            return await _set.FirstOrDefaultAsync(predicate).ConfigureAwait(false);
        }

        public T GetSingle(Expression<Func<T, bool>> predicate)
        {
            return _set.FirstOrDefault(predicate);
        }
    }
}
