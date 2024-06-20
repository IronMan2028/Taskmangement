# tasks/management/commands/load_tasks.py
from django.core.management.base import BaseCommand
from tasks.models import Task
import json
from datetime import datetime

class Command(BaseCommand):
    help = 'Loads initial tasks from tasks.json'

    def handle(self, *args, **kwargs):
        with open('tasks/tasks.json', 'r') as file:
            tasks = json.load(file)
            for task in tasks:
                Task.objects.create(
                    title=task['title'],
                    description=task['description'],
                    due_date=datetime.strptime(task['due_date'], '%Y-%m-%dT%H:%M:%SZ')
                )
        self.stdout.write(self.style.SUCCESS('Successfully loaded tasks'))
