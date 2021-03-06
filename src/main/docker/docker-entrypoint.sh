#!/bin/sh
#
# The MIT License (MIT)
#
# Copyright (c) 2016-present IxorTalk CVBA
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
#


# Exit on non-zero return value
set -e

# Init
IXORTALK_PROFILE=${IXORTALK_PROFILE:="dev"}
IXORTALK_CONFIG_SERVER_LABEL=${IXORTALK_CONFIG_SERVER_LABEL:="master"}
IXORTALK_CONFIG_SERVER_URL=${IXORTALK_CONFIG_SERVER_URL:="http://ixortalk-config-server:8899/config"}


# Get nginx config

rm -rf /etc/nginx/conf.d/default.conf

NGINX_CONF_URL=${IXORTALK_CONFIG_SERVER_URL}/ixortalk.user.registration.ui/${IXORTALK_PROFILE}/${IXORTALK_CONFIG_SERVER_LABEL}/ixortalk-user-registration-ui.conf
echo "Fetching nginx conf from $NGINX_CONF_URL"

wget $NGINX_CONF_URL -O /etc/nginx/conf.d/ixortalk-user-registration-ui.conf

# Get config.js

CONFIG_JS_URL=${IXORTALK_CONFIG_SERVER_URL}/ixortalk.user.registration.ui/${IXORTALK_PROFILE}/${IXORTALK_CONFIG_SERVER_LABEL}/config.js
echo "Fetching config.js from $CONFIG_JS_URL"

set +e
wget $CONFIG_JS_URL -O /usr/share/nginx/html/config.js
set -e

# Start nginx

nginx -g 'daemon off;'
