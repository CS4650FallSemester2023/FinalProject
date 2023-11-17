from django.contrib import admin
from .models import ToDo, GameSession

class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')

class GameSessionAdmin(admin.ModelAdmin):
    list_display = ('user', 'game', 'startTime', 'endTime', 'cookieCount', 'autoClickerCount', 'farmCount')

# Register your models here.

admin.site.register(Todo, TodoAdmin)
admin.site.register(GameSession, GameSessionAdmin)
