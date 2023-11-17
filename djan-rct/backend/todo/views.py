from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ToDoSerializer, GameSessionSerializer
from .models import ToDo, GameSession

# Create your views here.
# For listing all sessions and creating new ones
class TodoView(viewsets.ModelViewSet):
    serializer_class = ToDoSerializer
    queryset = Todo.objects.all()

class GameSessionView(viewsets.ModelViewSet):
    serializer_class = GameSessionSerializer
    queryset = GameSession.objects.all()