using Dapper;
using Entitys;
using System.Data;

namespace Data.Repositories
{
    public class ClienteRepository
    {
        private readonly IDbConnection _connection;

        public ClienteRepository(IDbConnection connection)
        {
            _connection = connection;
        }

        public bool Create()
        {
            using (var connection = _connection)
            {
                connection.Open();
                string sql = "SELECT Id, Name, Email FROM Customers";
                connection.Execute(sql, new { });
                return true;
            }
        }

        public Cliente[] Get()
        {
            using (var connection = _connection)
            {
                connection.Open();
                string sql = "SELECT * FROM Clientes;";
                return connection.Query<Cliente>(sql, new { }).ToArray();
            }
        }
    }
}
