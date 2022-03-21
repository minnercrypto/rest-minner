import User from '../models/Users';

export const renderIndex = (req, res) => {
  res.render("index", {layout: 'main.hbs'});
};
  
export const renderPrivacy = (req, res) => {
  res.render("privacy", {layout: 'main.hbs'});
};
  
export const renderLegal = (req, res) => {
  res.render("legal", {layout: 'main.hbs'});
};

export const renderCookies = (req, res) => {
  res.render("cookies", {layout: 'main.hbs'});
};