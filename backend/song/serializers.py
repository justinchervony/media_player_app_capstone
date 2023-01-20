from rest_framework import serializers
from .models import Song

class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ['id', 'title', 'artist', 'album', 'genre', 'album_cover_url', 'audio_file_url', 'users']
        depth = 1