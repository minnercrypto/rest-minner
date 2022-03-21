import express from 'express';
import {create} from 'express-handlebars';
import session from 'express-session';
import flash from 'connect-flash';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import methodOverride from 'method-override';
//import vhost from 'vhost';
//import bodyParser from 'body-parser';
import passport from 'passport';
 
import dashRoutes from './routes/dash.routes';
import usersRoutes from './routes/users.routes';
import indexRoutes from './routes/index.routes';
import "./config/passport";

const app = express();

// Redirection VHOST
// app.use(vhost("dashboard.localhost", dashRoutes));
// app.use(vhost("admin.localhost", adminRoutes));

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
const exphbs = create({
    extname: '.hbs',
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaultLayout:'main-dash'
  });  
app.engine(".hbs", exphbs.engine);
app.set("view engine", ".hbs");
  

// Middlewares
const corsOptions = {};
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// parse application/json
// app.use(bodyParser.json())

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  
  next();
});

// Routes
app.use(usersRoutes);
app.use(indexRoutes);
app.use(dashRoutes);

// Static files
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
  res.render("404");
});

export default app;