
from tkinter.ttk import Style
from turtle import title
from rest_framework import serializers
from .models import *

class RegisterSerializer(serializers.ModelSerializer):
    password2=serializers.CharField( style={'input_type':'passowrd'} , write_only=True)
    class Meta:
        model=User
        fields=['email' , 'name' , 'tc' , 'password' , 'password2']
        extra_kwargs={
            'password':{'write_only':True}
        }

    def validate(self, data):
        password1=data.get('password')
        password2=data.get('password2')
        if password1!=password2:
            raise serializers.ValidationError('Please Confirm your password')
        return data

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.ModelSerializer):
    email=serializers.CharField(max_length=255)
    class Meta:
        model=User
        fields=['email' , 'password']

class UserSerializer(serializers.ModelSerializer):
    email=serializers.CharField(max_length=255)
    class Meta:
        model=User
        fields=['id' , 'email' , 'name' ]



class NotesListSerializer(serializers.ModelSerializer):
    # user=serializers.SlugRelatedField(many=False, slug_field='user', queryset=User.objects.all())
    # user=UserSerializer()
    class Meta:
        model=Note
        fields=['user' , 'id' , 'title' , 'body' , 'updated']



class RUDNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model=Note
        fields='__all__'


class CreateNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model=Note
        fields='__all__'
