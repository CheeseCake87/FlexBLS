from flask import current_app as app, session
from flask import render_template, redirect

from app.globals import VITE_ROUTES


@app.route("/logout")
def logout():
    session["logged_in"] = False
    session["user_id"] = None
    session["user_type"] = None
    session["private_key"] = None
    return redirect("/")


def catch_all():
    return render_template("catch_all.html")


def catch_all_subpath(_):
    return render_template("catch_all.html")


for route in VITE_ROUTES:
    app.add_url_rule(f"{route}", view_func=catch_all)
    app.add_url_rule(f"{route}/<path:_>", view_func=catch_all_subpath)
