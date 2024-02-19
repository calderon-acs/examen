using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace API.Helpers
{
    public class AuthorizationFilter : IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("AquíSeColocaLaClaveSecretaSuperSegura");


            var tokenString = context.HttpContext.Request.Headers["Authorization"];
            if (string.IsNullOrEmpty(tokenString))
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            var token = tokenString.ToString().Replace("Bearer ", "");

            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true
            };

            try
            {

                var validate = tokenHandler.ValidateToken(token, validationParameters, out var validatedToken);


            }
            catch (SecurityTokenException)
            {

                context.Result = new UnauthorizedResult();
            }
        }
    }
}
