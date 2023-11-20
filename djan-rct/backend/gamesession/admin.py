from django.contrib import admin
from .models import GameSession
# Register your models here.

class GameSessionAdmin(admin.ModelAdmin):
    list_display = ('user', 'game', 'startTime', 'endTime', 'cookieCount', 'autoClickerCount')

admin.site.register(GameSession, GameSessionAdmin)