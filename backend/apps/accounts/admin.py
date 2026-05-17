from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):

    list_display = (
        'id',
        'email',
        'username',
        'role',
        'is_staff',
    )

    ordering = ('id',)

    fieldsets = UserAdmin.fieldsets + (
        (
            'Additional Info',
            {
                'fields': (
                    'phone_number',
                    'profile_image',
                    'role',
                )
            },
        ),
    )