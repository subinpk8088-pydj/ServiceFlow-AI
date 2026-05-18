from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Ticket
from .serializers import TicketSerializer


class TicketViewSet(viewsets.ModelViewSet):

    serializer_class = TicketSerializer

    permission_classes = [IsAuthenticated]


    def get_queryset(self):

        user = self.request.user

        # Admin sees all tickets
        if user.role == 'ADMIN':
            return Ticket.objects.all().order_by('-created_at')

        # Others see their own tickets
        return Ticket.objects.filter(
            created_by=user
        ).order_by('-created_at')


    def perform_create(self, serializer):

        serializer.save(
            created_by=self.request.user
        )
        
        