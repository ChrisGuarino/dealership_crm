#!/bin/bash

# Variables (update these as needed)
NEW_USER="admin_user"
NEW_PASSWORD="P@ssword"

# Create the user with full privileges
sudo mysql -u root <<EOF
-- Check if the user exists and drop it if it does
DROP USER IF EXISTS '${NEW_USER}'@'%';

-- Create the user with a new password
CREATE USER '${NEW_USER}'@'%' IDENTIFIED BY '${NEW_PASSWORD}';

-- Grant full privileges
GRANT ALL PRIVILEGES ON *.* TO '${NEW_USER}'@'%' WITH GRANT OPTION;

-- Apply privilege changes
FLUSH PRIVILEGES;
EOF

# Confirm user creation
if [ $? -eq 0 ]; then
  echo "User '${NEW_USER}' created successfully with full privileges."
else
  echo "Error creating user '${NEW_USER}'. Please check your inputs and try again."
fi

