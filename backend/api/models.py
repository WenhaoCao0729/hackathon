from django.db import models
import uuid
# Create your models here.

class Post(models.Model):
    
    # uuid = models.UUIDField(default=uuid.uuid4, editable=False,unique=True)
    id = models.CharField(max_length=200,primary_key=True,editable=False,unique=True)
    title = models.CharField(max_length=200,null=True, blank=True)
    likes = models.IntegerField(default=0)
    content = models.CharField(max_length=256, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, upload_to='images/')
    location = models.CharField(max_length=256, null=True, blank=True)

class Comment(models.Model):
    # uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    id = models.CharField(max_length=200, primary_key=True,editable=False,unique=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.TextField(max_length=256)






