# See also: app.json 'formation' and heroku config 'WEB_CONCURRENCY'
web: newrelic-admin run-program gunicorn --log-file=- --worker-class gevent --pythonpath /app/backend/ djangongboilerplate.wsgi
