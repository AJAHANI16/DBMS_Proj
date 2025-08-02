import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

db = SQLAlchemy()

def create_app():
    load_dotenv()   # reads .env in Backend/
    app = Flask(__name__)
    CORS(app)

    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    
    # Handle SQLite database URI to make it work with relative paths
    database_uri = os.getenv("DATABASE_URI")
    if database_uri and database_uri.startswith("sqlite:///") and not database_uri.startswith("sqlite:////"):
        # Convert relative SQLite path to absolute path relative to app instance folder
        db_path = database_uri.replace("sqlite:///", "")
        if db_path.startswith("instance/"):
            db_path = db_path.replace("instance/", "")
        absolute_db_path = os.path.join(app.instance_path, db_path)
        database_uri = f"sqlite:///{absolute_db_path}"
    
    app.config["SQLALCHEMY_DATABASE_URI"] = database_uri
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    JWTManager(app)

    from app.routes.auth import auth_bp
    from app.routes.api  import api_bp
    from app.routes.analytics import analytics_bp

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(api_bp,  url_prefix="/api")
    app.register_blueprint(analytics_bp, url_prefix="/analytics")

    return app

