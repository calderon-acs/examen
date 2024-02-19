using API.DTO.Articulo;
using API.DTO.Tienda;
using API.DTO.User;
using API.Helpers;
using Bussiness.Articulo;
using Bussiness.Tienda;
using Entitys;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace API.Controllers
{
    [ApiController]
    [Route("/articulo")]
    public class ArticuloController: ControllerBase
    {
        private readonly IDbConnection _connection;
        public ArticuloController(IDbConnection connection) 
        { 
            _connection = connection;
        }

        [HttpGet]
        [ServiceFilter(typeof(AuthorizationFilter))]
        public IActionResult Get()
        {
            return ActionResultHelper.TryCatch<Object>(() =>
            {
                var service = new ArticuloService(_connection);
                return service.Get();
            });
        }

        [HttpPost]
        [ServiceFilter(typeof(AuthorizationFilter))]
        public IActionResult Save([FromBody] RequestArticuloSaveDTO request)
        {
            return ActionResultHelper.TryCatch<Object>(() =>
            {
                var service = new ArticuloService(_connection);
                var articulo = new Articulo()
                {
                    ArticuloID = request.ArticuloID,
                    Codigo = request.Codigo,
                    TiendaID = request.TiendaID,
                    Stock = request.Stock,
                    Descripcion = request.Descripcion,
                    Imagen = request.Imagen,    
                    Precio = request.Precio,    
                };
                return service.Save(articulo);
            });
        }
    }
}
