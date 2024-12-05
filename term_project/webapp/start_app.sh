#!/bin/bash
cleanup() {
    echo "Ctrl+C received! Terminating background processes..."
    # Kill all background processes
    kill $(jobs -p) 2>/dev/null
    exit
}
trap cleanup SIGINT

backend_dir=/Users/chrisguarino/Documents/NJIT-working/CS631/dealership_crm/term_project/webapp/backend
frontend_dir=/Users/chrisguarino/Documents/NJIT-working/CS631/dealership_crm/term_project/webapp/new-dealership
backend_file=server.js
NPM=/Users/chrisguarino/.nvm/versions/node/v21.6.2/bin/npm
NODE=/Users/chrisguarino/.nvm/versions/node/v21.6.2/bin/node

echo "Starting backend server"
cd $backend_dir
echo "$NODE $backend_file"
$NODE $backend_file&
backend_pid=$!
echo "Started $backend_file with PID $backend_pid" 

echo "Starting frontend server"
cd $frontend_dir
echo "$NPM start"
$NPM start&
frontend_pid=$!
echo "Started frontend server with PID $frontend_pid" 

wait