import time

from flask import session
from flask_imp.auth import authenticate_password

from app import __version__
from app.api.system.query.system_user import (
    query_read_system_user_by_username,
    query_read_system_user_by_private_key,
)
from app.decorators import limit_to_json
from app.utilities import APIResponse
from .. import rest
from ..query.system import query_read_system
from ..query.system_service import query_read_all_services


@rest.post("/auth/login")
@limit_to_json
def auth_login(json):
    username = json.get("username")
    password = json.get("password")

    if "logged_in" in session and session["logged_in"]:
        return APIResponse.fail(
            "Already logged in.",
            data={
                "session": {k: v for k, v in session.items() if not k.startswith("_")},
            }
        )

    user = query_read_system_user_by_username(username=username)
    if not user:
        return APIResponse.fail("Invalid username or password.")

    if not authenticate_password(password, user.password, user.salt):
        return APIResponse.fail("Invalid password.")

    session["logged_in"] = True
    session["user_id"] = user.user_id
    session["user_type"] = user.user_type
    session["private_key"] = user.private_key

    return APIResponse.success(
        message="Logged in.",
        data={
            "session": {k: v for k, v in session.items() if not k.startswith("_")},
        }
    )


@rest.get("/auth/logout")
def auth_logout():
    session["logged_in"] = False
    session["user_id"] = None
    session["user_type"] = None
    session["private_key"] = None
    return APIResponse.success("logged out")


@rest.get("/auth/session")
def auth_session():
    system = query_read_system()
    services = query_read_all_services()

    return APIResponse.success(
        message="Current Session",
        data={
            "system_version": __version__,
            "system_setup": True if system else False,
            "system_services": [s.name for s in services if s.enabled],
            "session": {k: v for k, v in session.items() if not k.startswith("_")},
        },
    )


@rest.get("/auth/ws/<string:private_key>")
def auth_ws(private_key):
    user = query_read_system_user_by_private_key(private_key)

    if not user:
        print("User not found")
        return APIResponse.fail("Unauthorized")

    if user.private_key != private_key:
        print("Private key mismatch")
        return APIResponse.fail("Unauthorized")

    return APIResponse.success("Authorized")
