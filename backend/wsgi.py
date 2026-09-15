"""WSGI wrapper for PythonAnywhere (`from backend.wsgi import application`)."""

from a2wsgi import ASGIMiddleware

from backend.main import app

application = ASGIMiddleware(app)
