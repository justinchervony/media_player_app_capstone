from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from authentication.models import User
from .models import Song
from .serializers import SongSerializer

# Create your views here.

@api_view(['GET', 'POST'])
def song_list(request):
    if request.method == 'GET':
        songs = Song.objects.all()
        serializer = SongSerializer(songs, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = SongSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def song_detail(request, pk):
    song = get_object_or_404(Song, pk=pk)
    if request.method == 'GET':
        serializer = SongSerializer(song)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = SongSerializer(song, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    elif request.method == 'DELETE':
        song.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def user_songs(request, user_id):
    if request.method == 'GET':
        songs = Song.objects.filter(users=user_id)
        serializer = SongSerializer(songs, many=True)
        return Response(serializer.data)

@api_view(['POST'])
def new_song(request):
    if request.method == 'POST':
        # potentialSongTocreate = Song.objects.filter(title = request.data['title'], artist = request.data['artist'])
        # if potentialSongTocreate:
        #     userForSong = User.objects.get(pk=request.user.id)
        #     potentialSongTocreate.users.add(userForSong)
        #     potentialSongTocreate.save()
        # else:
        song1 = Song(title=request.data['title'], artist= request.data['artist'], album=request.data['album'], genre=request.data['genre'],album_cover_url=request.data['album_cover_url'],audio_file_url=request.data['audio_file_url'])
        song1.save()
        userForSong = User.objects.get(pk=request.user.id)
        song1.users.add(userForSong)
        song1.save()
        # serializer = SongSerializer(data=request.data)
        # serializer.is_valid(raise_exception=True)
        # serializer.save()
        return Response("created", status=status.HTTP_201_CREATED)