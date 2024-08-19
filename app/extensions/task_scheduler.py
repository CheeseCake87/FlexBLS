import typing as t
from importlib import import_module

from flask import Flask
from huey import SqliteHuey


class TaskScheduler:
    _flask_app: Flask
    huey: t.Optional[SqliteHuey] = None

    def __init__(self, app: t.Optional[Flask] = None) -> None:
        if app:
            self.init_app(app)

    def init_app(self, app: Flask) -> None:
        self._flask_app = app
        self.huey = SqliteHuey(
            filename=f"{app.instance_path}/huey.sqlite",
        )
        self._flask_app.extensions["huey"] = self.huey

    def return_huey(self, task_modules: t.Optional[t.List[str]] = None) -> SqliteHuey:
        if task_modules:
            for module in task_modules:
                try:
                    import_module(module)
                except ImportError as e:
                    print(f"Error importing {module}: {e}")
        return self.huey
