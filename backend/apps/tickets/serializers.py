from rest_framework import serializers

from .models import Ticket


class TicketSerializer(serializers.ModelSerializer):

    created_by_name = serializers.CharField(
        source='created_by.username',
        read_only=True
    )

    assigned_to_name = serializers.CharField(
        source='assigned_to.username',
        read_only=True
    )

    class Meta:

        model = Ticket

        fields = [
            'id',
            'title',
            'description',
            'status',
            'priority',

            'created_by',
            'created_by_name',

            'assigned_to',
            'assigned_to_name',

            'created_at',
            'updated_at',
        ]

        read_only_fields = [
            'created_by',
            'created_at',
            'updated_at',
        ]