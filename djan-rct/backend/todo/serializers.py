from rest_framework import serializers
from .models import GameSession
from .models import ToDo
class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        fields = ('title', 'description', 'completed')

class GameSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameSession
        fields = ('user', 'game','startTime','endTime', 'cookieCount', 'autoClickerCount')
