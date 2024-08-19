from typing import Any

from sqlalchemy import or_

from app.utilities import DatetimeDeltaMCTZU


def build_where_clause(model: Any, where: dict) -> set:
    wh_ = set()
    for k, v in where.items():

        if k == "_in" and isinstance(v, dict):
            for in_key, in_val in v.items():
                if isinstance(in_val, list):
                    if hasattr(model, in_key):
                        wh_.add(getattr(model, in_key).in_(in_val))
                        continue

        if k == "any_name":
            if not v:
                continue

            if hasattr(model, "first_name") and hasattr(model, "last_name") and hasattr(model, "business_name"):
                wh_.add(
                    or_(
                        model.business_name.ilike(f"%{v}%"),  # noqa
                        model.first_name.ilike(f"%{v}%"),  # noqa
                        model.last_name.ilike(f"%{v}%"),  # noqa
                    )
                )
            continue

        if k == "any_phone":
            if not v:
                continue

            if hasattr(model, "phone") and hasattr(model, "alt_phone"):
                wh_.add(
                    or_(
                        model.phone.ilike(f"%{v}%"),  # noqa
                        model.alt_phone.ilike(f"%{v}%"),  # noqa
                    )
                )
            continue

        if k == "any_email":
            if not v:
                continue

            if hasattr(model, "email_address") and hasattr(model, "alt_email_address"):
                wh_.add(
                    or_(
                        model.email_address.ilike(f"%{v}%"),  # noqa
                        model.alt_email_address.ilike(f"%{v}%"),  # noqa
                    )
                )
            continue

        if k == "date_on":
            if not v:
                continue

            if not hasattr(model, "created"):
                continue

            minus_day = (
                DatetimeDeltaMCTZU().set_datetime(v, "%Y-%m-%d").days(-1).datetime
            )
            plus_day = DatetimeDeltaMCTZU().set_datetime(v, "%Y-%m-%d").days(1).datetime
            wh_.add(model.created > minus_day)
            wh_.add(model.created < plus_day)
            continue

        if k == "date_from":
            if not v:
                continue

            if not hasattr(model, "created"):
                continue

            date_from = (
                DatetimeDeltaMCTZU().set_datetime(v, "%Y-%m-%d").days(-1).datetime
            )
            wh_.add(model.created > date_from)
            continue

        if k == "date_to":
            if not v:
                continue

            if not hasattr(model, "created"):
                continue

            date_to = DatetimeDeltaMCTZU().set_datetime(v, "%Y-%m-%d").days(1).datetime
            wh_.add(model.created < date_to)
            continue

        if not hasattr(model, k):
            continue

        if isinstance(v, str) and v:
            wh_.add(getattr(model, k) == v)
            continue

        wh_.add(getattr(model, k) == v)

    return wh_
