from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ToDoSerializer
from .models import ToDo

# Create your views here.
# For listing all sessions and creating new ones
class TodoView(viewsets.ModelViewSet):
    serializer_class = ToDoSerializer
    queryset = Todo.objects.all()
