using gaurdedText.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Data.Entity;


namespace gaurdedText.Controllers
{


    public class HomeController : Controller
    {
        public static string name = "";
        missiongraudedtextEntities db = new missiongraudedtextEntities();


        [Route("~/")]
        [Route("")]

        public ActionResult Index()
        {

            //var uri = Request.RawUrl;
            //ViewBag.urfl = uri;
            //string uriconversion = string.Empty;  

            //if (!string.IsNullOrEmpty(uri))
            //{
            //    uriconversion = uri.ToString();   
            //}

            //if (uriconversion == Man)
            //{
            //    return RedirectToAction("createsite");
            //}

            return View();
        }

        public ActionResult createsite()
        {
            return View();
        }

        [HttpPost]
        public ActionResult createsite(site_1 s)
        {

            db.site_1.Add(s);
            db.SaveChanges();
            return Json(new
            {
                redirect = "/Home/createtabs"
            },
                     JsonRequestBehavior.AllowGet
                 );
        }

        public ActionResult enterpassword()
        {
            return View();
        }

        [HttpPost]
        public JsonResult enterpass(site_1 s)
        {
            var hash = s.hashcontent;
            var name = s.site_url;
            bool result = !db.site_1.ToList().Exists(m => m.site_url.Equals(name, StringComparison.CurrentCultureIgnoreCase));
            if (result)
            {

                var msg = "Something went wrong,Please try again";
                return Json(new
                {
                    success = false,
                    msg
                },
                JsonRequestBehavior.AllowGet
                );
            }

            else
            {

                var result2 = db.site_1.Where(x => x.site_url == name).Select(x => x.hashcontent).ToList();

                if (result2[0] == hash)
                 
                {
                    var allUser = db.site_1.Where(x => x.site_url == name).Select(x => x.cipher).ToList();
                    return Json(new
                    {
                        text = allUser,
                        success = true,
                        redirect = "/Home/createtabs",

                    },
                      JsonRequestBehavior.AllowGet
                      );

                }
                else
                {
                    var msg = "WRONG PASSWORD";
                    return Json(new
                    {
                        success = false,
                        msg
                    },
                    JsonRequestBehavior.AllowGet
                    );

                 
                }
            }

        }

        //[HttpPost]
        //public JsonResult getusertext(string n)
        //{

        //    var allUser = db.site_1.Where(x => x.site_url == n).Select(x => x.cipher).ToList();
        //    return new JsonResult { Data = allUser, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        //}

        public ActionResult createtabs()
        {
            return View();
        }

        [HttpPost]
        public ActionResult createtabs(site_1 s)
        {

            db.Entry(s).State = EntityState.Modified;
            db.SaveChanges();
            var msg = "SAVED SUCCESSFUL";
            return Json(new
            {
                success = false,
                msg
            },
            JsonRequestBehavior.AllowGet
            );

        }

        [HttpPost]
        public JsonResult checkmail(string sitename)
        {
            bool result = !db.site_1.ToList().Exists(m => m.site_url.Equals(sitename, StringComparison.CurrentCultureIgnoreCase));

            //System.Threading.Thread.Sleep(2000);
            //var checkSiteName = db.site_1.Where(m => m.site_url == sitename).ToList().Count > 1;

            if (result)
            {
                return Json(new
                {
                    redirect = "/Home/createsite"
                },
                    JsonRequestBehavior.AllowGet
                );

            }

            else
            {
                return Json(new
                {
                    redirect = "/Home/enterpassword"
                },
                     JsonRequestBehavior.AllowGet
                 );

            }

        }





    }

}