import json
import os

from flask_appbuilder.security.manager import AUTH_OAUTH
from celery.schedules import crontab

from custom_sso_security_manager import CustomSsoSecurityManager

ENABLE_PROXY_FIX = True
DEBUG = False

SUPERSET_WEBSERVER_PROTOCOL = "https"
SUPERSET_WEBSERVER_ADDRESS = "superset.cmasc.io"

SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:sert3ch@localhost/superset'

APP_ICON = "/static/assets/images/gto_logo.png"
APP_ICON_WIDTH = 110

FEATURE_FLAGS = {
    "THUMBNAILS": True,
    "LISTVIEWS_DEFAULT_CARD_VIEW" : True,
    "THUMBNAILS_SQLA_LISTENERS": True,
    "ALERT_REPORTS": True
}

PUBLIC_ROLE_LIKE = 'Gamma'

WTF_CSRF_ENABLED = True
ENABLE_CORS = True
CORS_OPTIONS = { 
    'supports_credentials': True, 
    'allow_headers': [ 
        'X-CSRFToken', 'Content-Type', 'Origin', 'X-Requested-With', 'Accept', 
    ], 
    'resources': [ 
         '/superset/csrf_token/'  # auth 
         '/api/v1/formData/',  # sliceId => formData 
         '/superset/explore_json/*',  # legacy query API, formData => queryData 
         '/api/v1/query/',  # new query API, queryContext => queryData 
         '/superset/fetch_datasource_metadata/'  # datasource metadata 
 
    ], 
    'origins': ['*'], 
}

ENABLE_JAVASCRIPT_CONTROLS = True

MAPBOX_API_KEY = 'pk.eyJ1Ijoic2VydGVjaCIsImEiOiJjajZzYjJjMGIwMmZiMndteGo0eWZ2aHNuIn0.o5WvT10qYaOrmZQbMtUCGQ'
'''
# Auth
CUSTOM_SECURITY_MANAGER = CustomSsoSecurityManager
AUTH_TYPE = AUTH_OAUTH
AUTH_USER_REGISTRATION = True
# Role assigned to new authorized and registered users
AUTH_USER_REGISTRATION_ROLE = "Admin"
auth_credentials = json.load(open(os.environ.get('GOOGLE_OAUTH_CREDENTIALS')))['web']
auth_credentials_cmasc = json.load(open(os.environ.get('GOOGLE_OAUTH_CREDENTIALS_CMASC')))['web']
OAUTH_PROVIDERS = [
        {
            'name': 'google',
            'icon': 'fa-google',
            'token_key': 'access_token', 
            'remote_app': {
                'api_base_url': 'https://www.googleapis.com/oauth2/v2/',
                'client_kwargs': {
                    'scope': 'email profile'
                },
                'request_token_url': None,
                'access_token_url': auth_credentials['token_uri'],
                'authorize_url': auth_credentials['auth_uri'],
                # google api & services client id and secret
                'client_id': auth_credentials['client_id'],
                'client_secret': auth_credentials['client_secret']
            }
        },
        {
            'name': 'cmasc',
            'icon': 'fa-creative-commons',
            'token_key': 'access_token', 
            'remote_app': {
                'api_base_url': 'https://www.googleapis.com/oauth2/v2/',
                'client_kwargs': {
                    'scope': 'email profile'
                },
                'request_token_url': None,
                'access_token_url': auth_credentials_cmasc['token_uri'],
                'authorize_url': auth_credentials_cmasc['auth_uri'],
                # google api & services client id and secret
                'client_id': auth_credentials_cmasc['client_id'],
                'client_secret': auth_credentials_cmasc['client_secret']
            }
        }
    ]
'''
#ALERT_REPORTS_NOTIFICATION_DRY_RUN = True
THUMBNAIL_SELENIUM_USER = "admin"
EMAIL_REPORTS_USER = "admin"

DATA_CACHE_CONFIG = {
    'CACHE_TYPE': 'redis',
    'CACHE_DEFAULT_TIMEOUT': 60 * 60 * 24, # 1 day default (in secs)
    'CACHE_KEY_PREFIX': 'superset_results',
    'CACHE_REDIS_URL': 'redis://localhost:6379/2',
}
CACHE_CONFIG = {
    'CACHE_TYPE': 'redis'
}
THUMBNAIL_CACHE_CONFIG ={
    "CACHE_TYPE": 'redis',
    "CACHE_NO_NULL_WARNING": True,
}

THUMBNAIL_SELENIUM_USER = "superset.admin@cmasc.io"
EMAIL_REPORTS_USER = "superset.admin@cmasc.io"

class CeleryConfig(object):
    BROKER_URL = "redis://localhost:6379/0"
    CELERY_IMPORTS = ("superset.sql_lab", "superset.tasks")
    CELERY_RESULT_BACKEND = "redis://localhost:6379/1"
    CELERYD_LOG_LEVEL = "INFO"
    CELERYD_PREFETCH_MULTIPLIER = 1
    CELERY_ACKS_LATE = False
    CELERYBEAT_SCHEDULE = {
        "reports.scheduler": {
            "task": "reports.scheduler",
            "schedule": crontab(minute="*", hour="*"),
        },
        "reports.prune_log": {
            "task": "reports.prune_log",
            "schedule": crontab(minute=10, hour=0),
        },
    }

CELERY_CONFIG = CeleryConfig

# Email configuration
SMTP_HOST = "smtp-relay.gmail.com" #change to your host
SMTP_STARTTLS = True
SMTP_SSL = True
SMTP_USER = "superset.admin@cmasc.io"
SMTP_PORT = 587 # your port eg. 587
SMTP_PASSWORD = "sert3ch13"
SMTP_MAIL_FROM = "superset.admin@cmasc.io"