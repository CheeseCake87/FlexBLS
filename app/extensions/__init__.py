from flask_imp import Imp
from flask_sqlalchemy import SQLAlchemy
from vite_transporter.flask import ViteTransporter

from .folders import Folders
from .task_scheduler import TaskScheduler

imp = Imp()
db = SQLAlchemy()
folders = Folders()
vt = ViteTransporter()
ts = TaskScheduler()
