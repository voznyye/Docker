import hashlib

from flask_restful import Resource

from api.user.db import get_db


def hash_password(password):
    """Hashes the given password using SHA256"""
    hash_object = hashlib.sha256(password.encode('utf-8'))
    return hash_object.hexdigest()


class User(Resource):
    def getUsers(self):
        cursor = get_db().cursor()
        cursor.execute('SELECT id, name FROM user')
        return cursor.fetchall()

    def findUserById(self, user_id):
        """Get a user by ID"""
        user_db = get_db()
        cursor = user_db.cursor()
        cursor.execute('SELECT id, name FROM user WHERE id=%s', (user_id))
        return cursor.fetchone()

    def findBy(self, name, password):
        cursor = get_db().cursor()
        cursor.execute('SELECT id, name, password FROM user WHERE name=%s and password=%s', (name, password))
        return cursor.fetchone()

    def createUser(self, name, password):
        # Hash the password before storing it
        hashed_password = hash_password(password)

        find_user = self.findBy(name, hashed_password)

        if find_user is None:
            # Insert the new user into the database
            user_db = get_db()
            cursor = user_db.cursor()
            cursor.execute('INSERT INTO user (name, password) VALUES (%s, %s)', (name, hashed_password))
            user_db.commit()
        else:
            raise Exception(f"User {name} is already registered.")

    def updateUser(self, user_id, name, password):
        # Hash the password before storing it
        hashed_password = hash_password(password) if password else None

        # Update the user in the database
        user_db = get_db()
        cursor = user_db.cursor()
        if name and hashed_password:
            cursor.execute('UPDATE user SET name=%s, password=%s WHERE id=%s', (name, hashed_password, user_id))
        elif name:
            cursor.execute('UPDATE user SET name=%s WHERE id=%s', (name, user_id))
        else:
            cursor.execute('UPDATE user SET password=%s WHERE id=%s', (hashed_password, user_id))
        user_db.commit()

    def deleteUser(self, user_id):
        """Delete a user"""
        user_db = get_db()
        cursor = user_db.cursor()
        cursor.execute('DELETE FROM user WHERE id=%s', (user_id))
        user_db.commit()
