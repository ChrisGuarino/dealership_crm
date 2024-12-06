#!/bin/bash

# Database credentials
DB_USER="admin_user"
DB_PASS="P@ssword"
DB_HOST="localhost"

# SQL file path
SQLPATH=$(pwd)
SQL_FILE="$SQLPATH/db_scema_loader.sql"

# Run SQL file
mysql -u "$DB_USER" -p"$DB_PASS" -h "$DB_HOST" < "$SQL_FILE"

echo "Database setup completed."
