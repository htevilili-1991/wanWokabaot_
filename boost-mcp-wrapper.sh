#!/bin/bash
cd "/home/htevilili/Documents/MAG Services/wanWokabaot_" || { echo "Failed to cd to project"; exit 1; }
exec php artisan boost:mcp
