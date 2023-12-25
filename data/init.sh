#!/bin/bash

sqlite3 db.db ".read schema.sql"
echo ".exit" | sqlite3 db.db

