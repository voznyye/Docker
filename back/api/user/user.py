import hashlib

from flask_restful import Resource

from api.user.db import get_db


def hash_password(password):
    """Hashes the given password using SHA256"""
    hash_object = hashlib.sha256(password.encode('utf-8'))
    return hash_object.hexdigest()


class User(Resource):
    def getUsers(self):
        return get_db().execute('SELECT id, name FROM user').fetchall()

    def findUserById(self, user_id):
        """Get a user by ID"""
        user_db = get_db()
        return user_db.execute('SELECT id, name FROM user WHERE id=?', (user_id,)).fetchone()

    def findBy(self, name, password):
        return get_db().execute('SELECT id, name, password FROM user WHERE name=? and password=?',
                                (name, password,)).fetchone()

    def createUser(self, name, password):
        # Hash the password before storing it
        hashed_password = hash_password(password)

        find_user = self.findBy(name, hashed_password)

        if find_user is None:
            # Insert the new user into the database
            user_db = get_db()
            user_db.execute('INSERT INTO user (name, password) VALUES (?, ?)', (name, hashed_password))
            user_db.commit()
        else:
            raise Exception(f"User {name} is already registered.")

    def updateUser(self, user_id, name, password):
        # Hash the password before storing it
        hashed_password = hash_password(password) if password else None

        # Update the user in the database
        user_db = get_db()
        if name and hashed_password:
            user_db.execute('UPDATE user SET name=?, password=? WHERE id=?', (name, hashed_password, user_id))
        elif name:
            user_db.execute('UPDATE user SET name=? WHERE id=?', (name, user_id))
        else:
            user_db.execute('UPDATE user SET password=? WHERE id=?', (hashed_password, user_id))
        user_db.commit()

    def deleteUser(self, user_id):
        """Delete a user"""
        user_db = get_db()
        user_db.execute('DELETE FROM user WHERE id=?', (user_id,))
        user_db.commit()
