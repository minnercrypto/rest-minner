export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Not Authorized.");
    res.redirect("/login");
  };

export const isNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
   } else {
    return next();
   }
    req.flash("error_msg", "Tiene actualmente una sesión activa, cierre su sesión para volver al principio.");
    res.redirect("/dashboard");
  };