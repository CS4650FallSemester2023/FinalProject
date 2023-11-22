from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class GameSession(models.Model):
    user = models.CharField(max_length = 100)
    startTime = models.DateTimeField(auto_now_add = True)
    cookieCount = models.IntegerField(default = 0)
    autoClickerCount = models.IntegerField(default = 0)
    twoxClickerCount = models.IntegerField(default = 0)


