# backend/accounts/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_ADMIN = 'ADMIN'
    ROLE_MANAGER = 'MANAGER'
    ROLE_WRITER = 'WRITER'
    ROLE_CHOICES = [
        (ROLE_ADMIN, 'Admin'),
        (ROLE_MANAGER, 'Manager'),
        (ROLE_WRITER, 'Writer'),
    ]

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default=ROLE_WRITER)

    def is_admin(self):
        return self.role == self.ROLE_ADMIN or self.is_superuser

    def is_manager(self):
        return self.role == self.ROLE_MANAGER

    def is_writer(self):
        return self.role == self.ROLE_WRITER

    def __str__(self):
        return f"{self.username} ({self.role})"
