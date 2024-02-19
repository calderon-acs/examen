using API.DTO.Tienda;
using API.Helpers;
using Bussiness.Articulo;
using Bussiness.Tienda;
using Entitys;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace API.Controllers
{
    [ApiController]
    [Route("/tienda")]
    public class TiendaController: ControllerBase
    {
        private readonly IDbConnection _connection;
        public TiendaController(IDbConnection connection)
        {
            _connection = connection;
        }

        [HttpGet]
        [ServiceFilter(typeof(AuthorizationFilter))]
        public IActionResult Get()
        {
            return ActionResultHelper.TryCatch<Object>(() =>
            {
                var service = new TiendaService(_connection);
                return service.Get();
            });
        }

        [HttpPost]
        [ServiceFilter(typeof(AuthorizationFilter))]
        public IActionResult Save([FromBody] RequestTiendaSaveDTO request)
        {
            return ActionResultHelper.TryCatch<Object>(() =>
            {
                var service = new TiendaService(_connection);
                var tienda = new Tienda()
                {
                    Direccion = request.Direccion,
                    Sucursal = request.Sucursal,
                    TiendaID = request.TiendaID
                };
                return service.Save(tienda);
            });
        }
    }
}
