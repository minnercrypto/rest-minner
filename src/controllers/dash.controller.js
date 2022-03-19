import User from "../models/Users";

export const dashboard = async (req, res) => {
    try {
        const users = await User.find({ _id: req.user.id }).lean();
        res.render("dashboard/dashboard", { users });
    } catch (error) {
        console.log(error);
    }
};

export const balance = async (req, res) => {
    try {
        const users = await User.find({ _id: req.user.id }).lean();
        res.render("dashboard/balance", { users });
    } catch (error) {
        console.log(error);
    }
};

export const referral = async (req, res) => {
    try {
        const users = await User.find({ _id: req.user.id }).lean();
        res.render("dashboard/referral", { users });
    } catch (error) {
        console.log(error);
    }
};

export const reward = async (req, res) => {
    try {
        const users = await User.find({ _id: req.user.id }).lean();
        res.render("dashboard/reward", { users });
    } catch (error) {
        console.log(error);
    }
};

export const market = async (req, res) => {
    try {
        const users = await User.find({ _id: req.user.id }).lean();
        res.render("dashboard/market", { users });
    } catch (error) {
        console.log(error);
    }
};

export const profile = async (req, res) => {
    try {
        const users = await User.find({ _id: req.user.id }).lean();
        res.render("dashboard/profile", { users });
    } catch (error) {
        console.log(error);
    }
};

export const profileUpdate = async (req, res) => {
    const { phone, firstname, lastname, address, city, country, postalcode, wallet, addresswallet, description } = req.body;
    await User.findByIdAndUpdate(req.params.id, {phone, firstname, lastname, address, city, country, postalcode, wallet, addresswallet, description});
    req.flash("success_msg", "Se ha actualizado su perfil correctamente.");
    res.redirect("/profile");
};