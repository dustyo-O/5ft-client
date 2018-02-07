const mysql = require('mysql');
const pool = mysql.createPool({
    host: 'localhost',
    database: '5ft',
    user: 'root',
    password: '',
});

module.exports = {
    _get(id) {

    },

    aneks(params = {}) {
        const page = params.page || 1;
        const limitFrom = (page - 1) * 50;

        return new Promise(function(resolve, reject) {
            pool.getConnection(function (err, connection) {
                if (err || !connection) {
                    reject('mysql connection error');
                } else {
                    connection.query(`SELECT * FROM aneks ORDER BY id DESC LIMIT ${limitFrom}, 50`, function (err, rows) {
                        if (!err) {
                            resolve(rows);
                        }
                    });
                }

                if (connection) connection.release();
            });
        });
    },

    bestAneks(params = {}) {
        const page = params.page || 1;
        const date = params.date || '0000-00-00';
        const limitFrom = (page - 1) * 50;

        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                if (err || !connection) {
                    reject('mysql connection error');
                } else {
                    connection.query(
                        `SELECT * FROM aneks WHERE \`date\` > '${date}' ORDER BY rate DESC LIMIT ${limitFrom}, 50`,
                        function (err, rows) {
                            if (!err) {
                                resolve(rows);
                            }
                        }
                    );
                }

                if (connection) connection.release();
            });
        });
    },

    randomAneks() {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                if (err || !connection) {
                    reject('mysql connection error');
                } else {
                    connection.query(
                        `SELECT * FROM aneks WHERE RAND() <= 0.0005 LIMIT 50`,
                        function (err, rows) {
                            if (!err) {
                                resolve(rows);
                            }
                        }
                    );
                }

                if (connection) connection.release();
            });
        });
    },

    anek(params = {}) {
        const id = params.id;

        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                if (err || !connection) {
                    reject('mysql connection error');
                } else {
                    connection.query(`SELECT * FROM aneks WHERE id = '${id}'`, function (err, anek) {
                        if (!err) {
                            connection.query(`SELECT * FROM aneks ORDER BY RAND() LIMIT 2`, function(err, rand) {
                                if (!err) {
                                    resolve(anek.concat(rand));
                                }
                            });
                        }
                    });
                }

                if (connection) connection.release();
            });
        });
    },

    _vote(id, sign) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                if (err || !connection) {
                    reject('mysql connection error');
                } else {
                    connection.query(`UPDATE aneks SET rate = rate ${sign} 1 WHERE id = '${id}' LIMIT 1`, function (err, rows) {
                        connection.query(`SELECT * FROM aneks WHERE id = '${id}'`, function (err, rows) {
                            if (!err) {

                                resolve({
                                    status: 'success',
                                    rate: rows[0].rate
                                });
                            } else {
                                reject('no such anek');
                            }
                        });
                    });
                }

                if (connection) connection.release();
            });
        });
    },

    like(id) {
        return this._vote(id, '+');
    },

    dislike(id) {
        return this._vote(id, '-');
    }
}
