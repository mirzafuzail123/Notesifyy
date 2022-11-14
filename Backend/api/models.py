
from django.db import models
from django.contrib.auth.models import  AbstractBaseUser
from .manager import UserManager
# Create your models here.

class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='Email',
        max_length=255,
        unique=True,
    )
    name=models.CharField(max_length=100)
    tc = models.BooleanField()
    is_staff=models.BooleanField(default=False)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name' , 'tc']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin


class Note(models.Model):
    user=models.ForeignKey(User , on_delete=models.CASCADE , related_name='user')
    title=models.CharField(max_length=100)
    body=models.TextField()
    updated=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
