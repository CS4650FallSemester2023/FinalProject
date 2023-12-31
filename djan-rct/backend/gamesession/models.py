from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class GameSession(models.Model):
    user = models.CharField(max_length=100, primary_key=True)
    startTime = models.DateTimeField(auto_now_add = True)
    cookieCount = models.IntegerField(default = 0)
    autoClickCount = models.IntegerField(default = 0)
    doubleClickCount = models.IntegerField(default = 0)
    autoClickPrice = models.IntegerField(default = 20)
    doubleClickPrice = models.IntegerField(default = 40)