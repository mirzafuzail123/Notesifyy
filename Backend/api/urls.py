
from django.urls import path
from api import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/' , views.ResgisterView.as_view() , name='user-registeration'),
    path('login/' , views.LoginView.as_view() , name='user-login'),
    path('profile/' , views.UserProfile.as_view() , name='user-profile'),
    path('noteslist/' , views.NotesListView.as_view() , name='Notes-view'),
    path('addnote/' , views.CreateNoteView.as_view() , name='Notes-create'),
    path('rudnote/<int:pk>' , views.RUDNoteView.as_view() , name='Single-Note-view'),


]