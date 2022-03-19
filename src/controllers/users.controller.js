import User from '../models/Users';
import passport from "passport";

export const renderSignUpForm = (req, res) => res.render("signup");

export const signupPOST = async (req, res) => {
    let errors = [];
    const { username, email, password, confirm_password } = req.body;
    if (password != confirm_password) {
      errors.push({ text: "Passwords do not match." });
    }
    if (password.length < 4) {
      errors.push({ text: "Passwords must be at least 4 characters." });
    }
    if (errors.length > 0) {
      res.render("signup", {
        errors,
        username,
        email,
        password,
        confirm_password,
      });
    } else {
      // Look for email coincidence
      const emailUser = await User.findOne({ email: email });
      const usernameUser = await User.findOne({ username: username });
      if (emailUser) {
        req.flash("error_msg", "The Email is already in use.");
        res.redirect("/signup");
      } else if (usernameUser){
        req.flash("error_msg", "The Username is already in use.");
        res.redirect("/signup");
      } else {
        // Saving a New User
        const newUser = new User({ username, email, password });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash("success_msg", "You are registered.");
        res.redirect("/login");
      }
    }
  };

export const renderSigninForm = (req, res) => res.render("login");

export const signinPOST = passport.authenticate('local', {
  successRedirect: "/dashboard",
  failureRedirect: "/login",
  failureFlash: true,
});

export const logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "Se ha cerrado su sesión.");
  res.redirect("/login");
};
