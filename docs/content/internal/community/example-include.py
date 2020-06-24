import asyncio
import os
from datetime import datetime

from lib import async_rpc_server


class Manager:
    """Manages shards.  assigns shard nodes their ids and checks if they are alive"""
    def __init__(self, total_shards):
        print(f"Number of shards: {total_shards}")
        self.total_shards = total_shards
        self.registered = 0
        self.last_checkin = {}
        self.store = {}

    async def handle_task(self, method, *args, **kwargs):
        return (await (getattr(self, method)(*args, **kwargs)), 200)

    async def register(self):
        """Returns the next shard id that needs to be filled as well as the total shards"""
        if self.registered >= self.total_shards:
            raise Exception("Shard trying to register even though we're full")
        self.registered += 1
        print(f'Shard requested id, assigning {self.registered}/{self.total_shards}...')
        self.store[self.registered - 1] = {'shard_id': self.registered - 1}
        return {'shard_id': self.registered - 1, 'shard_count': self.total_shards}
