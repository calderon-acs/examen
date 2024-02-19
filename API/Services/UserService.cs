using API.DTO.User;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Services
{
    public class UserService
    {
        public UserService() { }    

        public static object GetLoggin(RequestLoginDTO user) 
        {
            if (user.UserName.Equals("andres@examen.com") && user.Password.Equals("66124a1ead3b32baa9b90e5cad8a4334")) 
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("AquíSeColocaLaClaveSecretaSuperSegura");
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                new Claim(ClaimTypes.Name, user.UserName)
                        // Puedes añadir más claims según tus necesidades
                    }),
                    Expires = DateTime.UtcNow.AddHours(1), // Tiempo de expiración del token
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                return new { UserName =user.UserName, name="Andres", token = tokenHandler.WriteToken(token) };
            }else
            {
                throw new Exception("Usuario o contraseña incorrecto.");
            }

        }
    }
}
