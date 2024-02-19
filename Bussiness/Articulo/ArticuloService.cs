using Data.Repositories;
using System.Data;

namespace Bussiness.Articulo
{
    public class ArticuloService
    {
        private readonly IDbConnection _dbConnection;

        public ArticuloService(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public Object Get()
        {
            var repository = new ArticuloRepository(_dbConnection);

            return repository.Get();
        }

        public Object Save(Entitys.Articulo data)
        {
            var repository = new ArticuloRepository(_dbConnection);

            return repository.Save(data);
        }
    }
}
