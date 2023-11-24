from django.shortcuts import render
from rest_framework import viewsets
from .serializers import GameSessionSerializer
from .models import GameSession

# Create your views here.

class GameSessionView(viewsets.ModelViewSet):
    serializer_class = GameSessionSerializer
    queryset = GameSession.objects.all()

class HighScoresView(viewsets.ModelViewSet):
    serializer_class = GameSessionSerializer
    queryset = GameSession.objects.order_by("-cookieCount")[:5]