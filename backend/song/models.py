from django.db import models
from authentication.models import User

# Create your models here.

class Song(models.Model):
    title = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    album = models.CharField(max_length=255)
    genre = models.CharField(max_length=255)
    album_cover_url = models.FilePathField
    audio_file_url = models.FilePathField
    users = models.ManyToManyField(User)