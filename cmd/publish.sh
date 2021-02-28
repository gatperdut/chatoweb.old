#!/bin/bash
gulp build-prod
sudo rm -rf /var/www/html/*
sudo mv dist/* /var/www/html