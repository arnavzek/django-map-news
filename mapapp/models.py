from django.db import models

# Create your models here.
class MapNews(models.Model):
    name=models.CharField(max_length=350)
    message=models.CharField(max_length=350)
    location=models.CharField(max_length=350)
    startTime=models.CharField(max_length=350, null=True, blank=True)
    endTime=models.CharField(max_length=350, null=True, blank=True)
    when=models.CharField(max_length=350, null=True, blank=True)
    eventType=models.CharField(max_length=350)

    def __str__(self):
        return self.message
