from flask import Flask
from flask_orjson import OrjsonProvider
from huey import SqliteHuey

__version__ = "0.1.1"


def create_app(
    return_huey: bool = False, return_db_access: bool = False
) -> Flask | SqliteHuey:
    from app.config import flask_config, imp_config
    from app.extensions import imp, db, vt, ts, folders

    app = Flask(__name__)
    app.json = OrjsonProvider(app)
    flask_config.init_app(app)

    folders.init_app(app)
    imp.init_app(app, imp_config)  # flask-imp
    db.init_app(app)  # flask-sqlalchemy
    if return_db_access:
        return app

    ts.init_app(app)  # Huey
    if return_huey:
        huey_ = ts.return_huey(task_modules=["app.tasks"])
        return huey_

    imp.import_app_resources()
    imp.import_blueprint("api")

    with app.app_context():
        db.create_all()

    # vite-transporter
    vt.init_app(
        app,
        cors_allowed_hosts=[
            "http://127.0.0.1:7071",
        ]
        if app.debug
        else None,
    )

    return app


__all__ = ["create_app", "__version__"]
