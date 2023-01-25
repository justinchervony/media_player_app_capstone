from rest_framework import serializers
from .models import Song

class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ['id', 'title', 'artist', 'album', 'genre', 'album_cover_url', 'audio_file_url', 'user_id', 'users']
        depth = 1

    user_id = serializers.IntegerField(write_only=True)