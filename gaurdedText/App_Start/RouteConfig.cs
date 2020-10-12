using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Globalization;


namespace gaurdedText
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");


            routes.MapRoute(
                name: "newRoute",
                url: "{name}",
                defaults: new { controller = "Home", action = "Index", name = UrlParameter.Optional }

   );

            routes.MapRoute(
                name: "newRoute2",
                url: "{name}",
                defaults: new { controller = "Home", action = "createsite", name = UrlParameter.Optional }

   );
            routes.MapRoute(
                    name: "newRoute3",
                    url: "{name}",
                    defaults: new { controller = "Home", action = "enterpassword", name = UrlParameter.Optional }

       );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{name}",
                defaults: new { controller = "Home", action = "Index", name = UrlParameter.Optional }

            );

          
            
        }
    }
}
