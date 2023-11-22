from django.db import models
from django.contrib.auth.models import User
from todo.models import Todo


# Create your models here.
class GameSession(models.Model):
    user = models.CharField(max_length=100, primary_key=True)
    startTime = models.DateTimeField(auto_now_add = True)
    cookieCount = models.IntegerField(default = 0)
    autoClickerCount = models.IntegerField(default = 0)
    doubleClickCount = models.IntegerField(default = 0)