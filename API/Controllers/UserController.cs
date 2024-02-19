using API.DTO.User;
using API.Helpers;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace API.Controllers
{
    [ApiController]
    [Route("/user")]
    public class UserController : ControllerBase
    {

        [HttpPost]
        public IActionResult PostLogin([FromBody] RequestLoginDTO request)
        {
            return ActionResultHelper.TryCatch<Object>(() =>
            {
                return UserService.GetLoggin(request);  
            });
        }
    }
}
