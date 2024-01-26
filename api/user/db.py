import pymysql

import click
from flask import g, current_app

import os



def dict_factory(cursor, row):
    """Converts mysql result rows to dictionaries."""
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d



def get_db():
    """Establishes a connection to the mysql database."""
    if 'db' not in g:
        try:
            g.db = pymysql.connect(
                host=os.environ.get('DB_HOST', 'db'),
                port=int(os.environ.get('DB_PORT', 3306)),
                user=os.environ.get('DB_USER', 'myuser'),
                password=os.environ.get('DB_PASSWORD', 'mypassword'),
                database=os.environ.get('DB_DATABASE', 'mydatabase'),
                charset='utf8',
                cursorclass=pymysql.cursors.DictCursor
            )

        except Exception as e:
            print(e)
            raise e

    return g.db



def close_db(e=None):
    """Closes the connection to the mysql database."""
    db = g.pop('db', None)

    if db is not None:
        db.close()


def init_db():
    db = get_db()

    with current_app.open_resource('user/init.sql') as f:
        db.executescript(f.read().decode('utf8'))


@click.command('init-db')
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')


def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)
