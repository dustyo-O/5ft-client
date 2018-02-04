Object.assign || (Object.assign = require('object-assign'));

var fs = require('fs'),
    path = require('path'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    serveStatic = require('serve-static'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    slashes = require('connect-slashes'),
    passport = require('passport'),
    // LocalStrategy = require('passport-local').Strategy,
    csrf = require('csurf'),
    compression = require('compression'),

    config = require('./config'),
    staticFolder = config.staticFolder,

    Render = require('./render'),
    render = Render.render,
    dropCache = Render.dropCache, // eslint-disable-line no-unused-vars

    api = require('./api');

    port = process.env.PORT || config.defaultPort,
    isSocket = isNaN(port),
    isDev = process.env.NODE_ENV === 'development';

require('debug-http')();

app
    .disable('x-powered-by')
    .enable('trust proxy')
    .use(compression())
    .use(favicon(path.join(staticFolder, 'favicon.ico')))
    .use(serveStatic(staticFolder))
    .use(morgan('combined'))
    .use(cookieParser())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(expressSession({
        resave: true,
        saveUninitialized: true,
        secret: config.sessionSecret
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use(csrf());

// NOTE: conflicts with livereload
isDev || app.use(slashes());

passport.serializeUser(function(user, done) {
    done(null, JSON.stringify(user));
});

passport.deserializeUser(function(user, done) {
    done(null, JSON.parse(user));
});

app.get('/ping/', function(req, res) {
    res.send('ok');
});

app.get('/', function(req, res) {
    render(req, res, {
        view: 'page-index',
        title: 'Main page',
        meta: {
            description: 'Page description',
            og: {
                url: 'https://site.com',
                siteName: 'Site name'
            }
        }
    })
});

/**
 * Страницы анекдотов
 */
app.get('/p/:page', function(req, res) {
    const isAjax = req.rawHeaders.indexOf('XMLHttpRequest') !== -1,
        page = req.params.page;

    api.aneks(req, null, { page }).then(aneks => {
        render(req, res, {
            view: 'page-feed',
            title: 'Анекдоты: страница ' + page,
            aneks: aneks
        }, isAjax && {
            block: 'feed'
        }, isAjax);
    });
});

/**
 * Один анекдот
 */
app.get('/a/:id', function (req, res) {
    const id = req.params.id;

    api.anek(req, null, { id })
        .then(anek => {
            if (!anek) {
                res.status(404);
            }

            render(req, res, {
                view: 'page-anek',
                title: 'Анекдот #' + id,
                aneks: anek
            });
        });

});

app.get('/api/aneks/:page', function(req, res) {
    api.aneks(req, res, { page: req.params.page });
});

app.post('/api/like/:anek', function(req, res) {
    api.like(req, res, { anek: req.params.anek }).then(result => res.send(result));
});

app.post('/api/dislike/:anek', function(req, res) {
    api.dislike(req, res, { anek: req.params.anek }).then(result => res.send(result));
});

isDev && require('./rebuild')(app);

app.get('*', function(req, res) {
    res.status(404);
    return render(req, res, { view: '404' });
});

if (isDev) {
    app.get('/error/', function() {
        throw new Error('Uncaught exception from /error');
    });

    app.use(require('errorhandler')());
}

isSocket && fs.existsSync(port) && fs.unlinkSync(port);

app.listen(port, function() {
    isSocket && fs.chmod(port, '0777');
    console.log('server is listening on', this.address().port);
});
