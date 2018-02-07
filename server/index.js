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

/**
 * Главная страница
 */
app.get('/', function(req, res) {
    api.aneks(req, null, { page: 1 }).then(aneks => {
        render(req, res, {
            view: 'page-feed',
            title: 'Анекдоты: страница 1',
            aneks: aneks
        });
    });
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
 * Лучшие анекдоты
 */
app.get('/bestaneks/p/:page', function (req, res) {
    const isAjax = req.rawHeaders.indexOf('XMLHttpRequest') !== -1,
        page = req.params.page;

    api.bestAneks(req, null, { page }).then(aneks => {
        render(req, res, {
            view: 'page-feed',
            title: 'Лучшие анекдоты: страница ' + page,
            aneks: aneks,
            page: 'bestaneks'
        }, isAjax && {
            block: 'feed'
        }, isAjax);
    });
});

/**
 * Лучшие за год
 */
app.get('/bestyear/p/:page', function (req, res) {
    const isAjax = req.rawHeaders.indexOf('XMLHttpRequest') !== -1,
        page = req.params.page,
        date = (new Date()).toISOString().slice(0, 10),
        yearAgo = (parseInt(date.slice(0, 4)) - 1).toString() + date.slice(4);

    api.bestAneks(req, null, { page, date: yearAgo }).then(aneks => {
        render(req, res, {
            view: 'page-feed',
            title: 'Лучшие анекдоты: страница ' + page,
            aneks: aneks,
            page: 'bestyear'
        }, isAjax && {
            block: 'feed'
        }, isAjax);
    });
});

/**
 * Лучшие за месяц
 */
app.get('/bestmonth/p/:page', function (req, res) {
    const isAjax = req.rawHeaders.indexOf('XMLHttpRequest') !== -1,
        page = req.params.page,
        date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth(),
        day = date.getDate(),
        monthAgo = new Date(year, +month - 1, day).toISOString().slice(0, 10);

    api.bestAneks(req, null, { page, date: monthAgo }).then(aneks => {
        render(req, res, {
            view: 'page-feed',
            title: 'Лучшие анекдоты: страница ' + page,
            aneks: aneks,
            page: 'bestmonth'
        }, isAjax && {
            block: 'feed'
        }, isAjax);
    });
});

/**
 * Лучшие за неделю
 */
app.get('/bestweek/p/:page', function (req, res) {
    const isAjax = req.rawHeaders.indexOf('XMLHttpRequest') !== -1,
        page = req.params.page,
        date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth(),
        day = date.getDate(),
        weekAgo = new Date(year, month, +day - 7).toISOString().slice(0, 10);

    api.bestAneks(req, null, { page, date: weekAgo }).then(aneks => {
        render(req, res, {
            view: 'page-feed',
            title: 'Лучшие анекдоты: страница ' + page,
            aneks: aneks,
            page: 'bestweek'
        }, isAjax && {
            block: 'feed'
        }, isAjax);
    });
});


/**
 * Случайные
 */
var randomController = function (req, res) {
    const isAjax = req.rawHeaders.indexOf('XMLHttpRequest') !== -1;

    api.randomAneks(req).then(aneks => {
        render(req, res, {
            view: 'page-feed',
            title: 'Случайные анекдоты',
            aneks: aneks,
            page: 'random'
        }, isAjax && {
            block: 'feed'
        }, isAjax);
    });
};

app.get('/random', randomController);
app.get('/random/p/:page', randomController);

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
