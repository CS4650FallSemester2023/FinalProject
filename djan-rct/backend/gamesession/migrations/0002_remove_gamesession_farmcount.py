# Generated by Django 4.2.7 on 2023-11-20 20:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gamesession', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='gamesession',
            name='farmCount',
        ),
    ]