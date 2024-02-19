using Dapper;
using Entitys;
using System.Data;

namespace Data.Repositories
{
    public class TiendaRepository
    {
        private readonly IDbConnection _connection;

        public TiendaRepository(IDbConnection connection)
        {
            _connection = connection;
        }

        public bool Save(Tienda data)
        {
            using (var connection = _connection)
            {
                connection.Open();
                string sql = String.Empty;
                if (data.TiendaID.Equals(0))
                {
                    sql = @"
INSERT INTO Tienda (
                       
                       Sucursal,
                       Direccion
                   )
                   VALUES (
                       
                       @Sucursal,
                       @Direccion
                   );";
                }
                else
                {
                    sql = @"
UPDATE Tienda
   SET 
       Sucursal = @Sucursal,
       Direccion = @Direccion
 WHERE TiendaID = @TiendaID;";


                }
                connection.Execute(sql, data);
                return true;
            }
        }

        public Tienda[] Get()
        {
            using (var connection = _connection)
            {
                connection.Open();
                string sql = @"SELECT TiendaID,
       Sucursal,
       Direccion
  FROM Tienda;
";
                return connection.Query<Tienda>(sql).ToArray();
            }
        }
    }
}
