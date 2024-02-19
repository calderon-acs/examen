using Microsoft.AspNetCore.Mvc;

namespace API.Helpers
{
    public class ActionResultHelper
    {
        public static IActionResult TryCatch<T>(Func<T> action)
        {
            try
            {
                var result = action();
                return new OkObjectResult(result);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message){ StatusCode=500 };
            }
        }
    }
}
