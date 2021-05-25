import json
import os

from flask_appbuilder.security.manager import AUTH_OAUTH
from custom_sso_security_manager import CustomSsoSecurityManager

DEBUG = False

SUPERSET_WEBSERVER_PROTOCOL = "https"
SUPERSET_WEBSERVER_ADDRESS = "superset.cmasc.io"
ENABLE_PROXY_FIX = True
HTTP_HEADERS = {'X-Frame-Options': 'ALLOWALL'}
SESSION_COOKIE_SAMESITE = 'None'
SESSION_COOKIE_HTTPONLY = False
SESSION_COOKIE_SECURE = True

ENABLE_CORS = True
CORS_OPTIONS = {
  'supports_credentials': True,
  'allow_headers': ['X-CSRFToken', 'Content-Type', 'Origin', 'X-Requested-With','Accept'],
  'resources': [
    '/superset/csrf_token/', # auth
    '/superset/explore_json/*', # legacy query API
    '/api/v1/chart/data', # new query API
  ],
  'origins': ['http://localhost:9000']
}


SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:sert3ch@meta_db/superset_v1'

REDIS_HOST = os.getenv("REDIS_HOST")
REDIS_PORT = os.getenv("REDIS_PORT")

DATA_CACHE_CONFIG = {
    'CACHE_TYPE': 'redis',
    'CACHE_DEFAULT_TIMEOUT': 60 * 60 * 24, # 1 day default (in secs)
    'CACHE_KEY_PREFIX': 'superset_results',
    'CACHE_REDIS_URL': 'redis://{host}:{port}/0'.format(host=REDIS_HOST, port=REDIS_PORT)
}

THUMBNAIL_CACHE_CONFIG = {
    'CACHE_TYPE': 'redis',
    'CACHE_DEFAULT_TIMEOUT': 24*60*60,
    'CACHE_KEY_PREFIX': 'thumbnail_',
    'CACHE_REDIS_URL': 'redis://{host}:{port}/0'.format(host=REDIS_HOST, port=REDIS_PORT)
}


class CeleryConfig(object):
    BROKER_URL = 'redis://{host}:{port}/0'.format(host=REDIS_HOST, port=REDIS_PORT)
    CELERY_IMPORTS = ("superset.sql_lab", "superset.tasks", "superset.tasks.thumbnails")
    CELERY_RESULT_BACKEND = 'redis://{host}:{port}/0'.format(host=REDIS_HOST, port=REDIS_PORT)
    CELERYD_PREFETCH_MULTIPLIER = 10
    CELERY_ACKS_LATE = True


CELERY_CONFIG = CeleryConfig

WEBDRIVER_BASEURL = "http://superset:8080"
WEBDRIVER_WINDOW = {"dashboard": (1920, 3000), "slice": (3000, 1200)}
THUMBNAIL_SELENIUM_USER = "admin"
WEBDRIVER_TYPE= "firefox"
WEBDRIVER_OPTION_ARGS = [
        "--force-device-scale-factor=2.0",
        "--high-dpi-support=2.0",
        "--headless",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-extensions",
        ]



BABEL_DEFAULT_LOCALE = "es"
LANGUAGES = {
    "es": {"flag": "es", "name": "Spanish"},
    "en": {"flag": "us", "name": "English"}
}
FEATURE_FLAGS = {
    "DASHBOARD_NATIVE_FILTERS": True,
    "THUMBNAILS": True,
    "LISTVIEWS_DEFAULT_CARD_VIEW" : True,
    "THUMBNAILS_SQLA_LISTENERS": True
}

APP_NAME = "Sistema de Consultas de Información de Guanajuato"
APP_ICON = "/static/assets/images/gto.png"
APP_ICON_WIDTH = 100

# Auth
CUSTOM_SECURITY_MANAGER = CustomSsoSecurityManager
AUTH_TYPE = AUTH_OAUTH
AUTH_USER_REGISTRATION = True
# Role assigned to new authorized and registered users
AUTH_USER_REGISTRATION_ROLE = "Alpha"
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


ENABLE_JAVASCRIPT_CONTROLS = True

#TALISMAN_ENABLED = True
WTF_CSRF_ENABLED = False

MAPBOX_API_KEY = 'pk.eyJ1Ijoic2VydGVjaCIsImEiOiJjajZzYjJjMGIwMmZiMndteGo0eWZ2aHNuIn0.o5WvT10qYaOrmZQbMtUCGQ'