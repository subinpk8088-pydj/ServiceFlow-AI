from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):

    ROLE_CHOICES = (
        ('ADMIN', 'Admin'),
        ('MANAGER', 'Manager'),
        ('EMPLOYEE', 'Employee'),
        ('CLIENT', 'Client'),
    )

    email = models.EmailField(unique=True)

    phone_number = models.CharField(
        max_length=15,
        blank=True,
        null=True
    )

    profile_image = models.ImageField(
        upload_to='profiles/',
        blank=True,
        null=True
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='CLIENT'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email