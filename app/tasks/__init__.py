import asyncio
import json

import sqlalchemy as s  # noqa
import websockets
from huey import crontab  # noqa

from app.extensions import ts  # noqa

URI = "ws://localhost:7072"


async def instruction():
    async with websockets.connect(URI) as websocket:
        payload = {
            "action": "broadcast",
            "data": {
                "message": "Hello, World!"
            },
        }
        await websocket.send(json.dumps(payload))


@ts.huey.periodic_task(crontab(minute="*/1"), expires=30)
def example() -> None:
    print("example")


@ts.huey.periodic_task(crontab(minute="*/1"), expires=30)
def ws() -> None:
    asyncio.run(instruction())

# @ts.huey.task()
# def example() -> None:
#     from app import create_app
#     from app.api.clients.models import Client
#     from app.extensions import db
#
#     app = create_app(return_db_access=True)
#
#     with app.app_context():
#         query = db.session.execute(
#             s.Select(Client).where(Client.client_id == 1)  # type: ignore
#         ).scalar()
#         print(f"Tickets: {query.rel_workshop_tickets}")


# __all__ = ["hello_world", "show_client_tickets"]
