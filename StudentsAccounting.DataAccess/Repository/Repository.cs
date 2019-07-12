using Microsoft.EntityFrameworkCore;
using StudentsAccounting.DataAccess.Context;
using StudentsAccounting.DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
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
            _context.SaveChanges();
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

        public IQueryable<T> GetAll(Expression<Func<T, bool>> predicate)
        {
            return _set.AsQueryable();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _set.FindAsync(id);
        }

        public async Task<T> GetSingleAsync(Expression<Func<T, bool>> predicate)
        {
            return await _set.FirstOrDefaultAsync(predicate);
        }
    }
}
