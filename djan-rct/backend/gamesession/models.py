from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class GameSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    startTime = models.DateTimeField(auto_now_add = True)
    endTime = models.DateTimeField()
    cookieCount = models.IntegerField(default = 0)
    autoClickerCount = models.IntegerField(default = 0)


    def is_active(self):
        return self.endTime is None