from django.urls import path, include
from songs import views


urlpatterns = [
    path('', views.user_songs),
    path('all/', views.song_list),
    path('<int:pk>', views.song_detail),
]