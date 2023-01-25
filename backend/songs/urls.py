from django.urls import path, include
from songs import views


urlpatterns = [
    path('user/<int:user_id>', views.user_songs),
    path('library/', views.song_list),
    path('<int:pk>', views.song_detail),
    path('new/', views.new_song)
]