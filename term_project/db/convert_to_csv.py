import os
import pymysql
import pandas as pd

# Database credentials
host = 'localhost'
user = 'admin_user'
password = 'P@ssword'
database = 'CarDealership'

# Output directory
output_dir = '/db_tables'
os.makedirs(output_dir, exist_ok=True)

# Connect to the database
connection = pymysql.connect(host=host, user=user, password=password, database=database)
cursor = connection.cursor()

# Fetch all tables
cursor.execute("SHOW TABLES;")
tables = [table[0] for table in cursor.fetchall()]

# Export each table
for table in tables:
    query = f"SELECT * FROM {table}"
    df = pd.read_sql(query, connection)
    output_file = os.path.join(output_dir, f"{table}.csv")
    df.to_csv(output_file, index=False)
    print(f"Exported {table} to {output_file}")

# Close the connection
cursor.close()
connection.close()
print("Export complete.")
