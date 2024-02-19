using Data.Repositories;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness.Tienda
{
    public class TiendaService
    {
        private readonly IDbConnection _dbConnection;

        public TiendaService(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public Object Save(Entitys.Tienda request)
        {

            var repository = new TiendaRepository(_dbConnection);

            return repository.Save(request);
        }

        public Object Get()
        {

            var repository = new TiendaRepository(_dbConnection);

            return repository.Get();
        }
    }
}
