using Dapper;
using Entitys;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class ArticuloRepository
    {
        private readonly IDbConnection _connection;

        public ArticuloRepository(IDbConnection connection)
        {
            _connection = connection;
        }

        public bool Save(Articulo data)
        {
            using (var connection = _connection)
            {
                connection.Open();
                string sql = String.Empty;
                if (data.ArticuloID.Equals(0))
                {
                    sql = @"
INSERT INTO Articulo (
                         Codigo,
                         Descripcion,
                         Precio,
                         Imagen,
                         Stock,
                         TiendaID
                     )
                     VALUES (
                         @Codigo,
                         @Descripcion,
                         @Precio,
                         @Imagen,
                         @Stock,
                         @TiendaID
                     );";
                }
                else
                {
                    sql = @"
UPDATE Articulo
   SET 
       Codigo = @Codigo,
       Descripcion = @Descripcion,
       Precio = @Precio,
       Imagen = @Imagen,
       Stock = @Stock,
       TiendaID = @TiendaID
 WHERE ArticuloID = @ArticuloID;
";


                }
                connection.Execute(sql, data);
                return true;
            }
        }

        public Object[] Get()
        {
            using (var connection = _connection)
            {
                connection.Open();
                string sql = @"SELECT articuloID,codigo,descripcion,precio,imagen,stock,a.tiendaID , t.sucursal
FROM Articulo a
INNER JOIN Tienda t on a.tiendaId = t.tiendaid
;";
                return connection.Query(sql).ToArray();
            }
        }
    }
}
