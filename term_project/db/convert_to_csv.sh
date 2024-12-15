#!/bin/bash

# Database credentials
USER="root"
PASSWORD="P@ssword"
DATABASE="CarDealership"

# Output directory
OUTPUT_DIR="/db_tables/"

# Ensure the output directory exists
mkdir -p $OUTPUT_DIR

# Get a list of tables in the database
tables=$(sudo mysql -u $USER -e "SHOW TABLES IN $DATABASE;" | tail -n +2)

# Loop through the tables and export each to a CSV
for table in $tables; do
  sudo mysql -u $USER -p$PASSWORD -e "SELECT * FROM $DATABASE.$table INTO OUTFILE '$OUTPUT_DIR/$table.csv'
  FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\n';"
done

echo "Export complete. Check the files in $OUTPUT_DIR."
