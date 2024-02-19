using Data.Repositories;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness.Cliente
{
    public class ClienteService
    {
        private readonly IDbConnection _dbConnection;

        public ClienteService(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public Object Create(){

            var repository = new ClienteRepository(_dbConnection);

            return repository.Create();
        }

        public Object Get()
        {

            var repository = new ClienteRepository(_dbConnection);

            return repository.Get();
        }
    }
}
