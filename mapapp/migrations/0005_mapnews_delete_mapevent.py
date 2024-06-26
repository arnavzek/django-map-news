# Generated by Django 5.0.4 on 2024-04-21 22:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mapapp', '0004_mapevent_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='MapNews',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=350)),
                ('message', models.CharField(max_length=350)),
                ('location', models.CharField(max_length=350)),
                ('startTime', models.CharField(blank=True, max_length=350)),
                ('endTime', models.CharField(blank=True, max_length=350)),
                ('when', models.CharField(blank=True, max_length=350)),
                ('eventType', models.CharField(max_length=350)),
            ],
        ),
        migrations.DeleteModel(
            name='MapEvent',
        ),
    ]
