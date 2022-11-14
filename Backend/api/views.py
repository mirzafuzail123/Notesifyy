from functools import partial
from urllib import request

from django.urls import is_valid_path
from .token import get_tokens_for_user
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import *
from .renderer import User_renderer
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView , RetrieveUpdateDestroyAPIView , CreateAPIView
# Create your views here.

#Registration
class ResgisterView(APIView):
    renderer_classes=[User_renderer]
    def post(self , request , format=None):
        serializer=RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user=serializer.save()
        token=get_tokens_for_user(user)
        return Response({"token":token , 'message':'Registration Successfull'} , status=status.HTTP_201_CREATED)

#Login
class LoginView(APIView):
    renderer_classes=[User_renderer]
    def post(self , request , format=None):
        serializer=LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email=request.data.get('email')
        password=request.data.get('password')
        user=authenticate(email=email , password=password)
        if user is not None:
            token=get_tokens_for_user(user)
            return Response({"token":token , 'message':'Registration Successfull' , "user":user.id ,} , status=status.HTTP_200_OK )
        else:
            return Response(serializer.errors , status=status.HTTP_401_UNAUTHORIZED)

#Profile
class UserProfile(APIView):
    renderer_classes=[User_renderer]
    permission_classes=[IsAuthenticated]
    def get(self , request , format=None):
        data={
            'id':request.user.id,
            'email':request.user.email,
            'name':request.user.name,

        }
        serializer=UserSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            return Response(serializer.data)




#List of Notes
class NotesListView(ListAPIView):
    renderer_classes=[User_renderer]
    serializer_class=NotesListSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        return Note.objects.all().filter(user=self.request.user)


#RUD_Notes
class RUDNoteView(RetrieveUpdateDestroyAPIView):
    renderer_classes=[User_renderer]
    queryset=Note.objects.all()
    serializer_class=RUDNoteSerializer
    permission_classes=[IsAuthenticated]


class CreateNoteView(CreateAPIView):
    renderer_classes=[User_renderer]
    queryset=Note.objects.all()
    serializer_class=CreateNoteSerializer
    permission_classes=[IsAuthenticated]

