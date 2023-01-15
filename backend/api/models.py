from django.db import models
import uuid
# Create your models here.
def generate_custom_uuid():
    return str(uuid.uuid4())
class Post(models.Model):
    
    id = models.CharField(max_length=200,default=generate_custom_uuid, editable=False, unique=True, primary_key=True)
    title = models.CharField(max_length=200,null=True, blank=True)
    likes = models.IntegerField(default=0)
    content = models.CharField(max_length=256, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, upload_to='images/')
    location = models.CharField(max_length=256, null=True, blank=True)


# class Comment(models.Model):
#     id = models.CharField(max_length=200,default=generate_custom_uuid, primary_key=True, editable=False, unique=True)
#     post = models.ForeignKey(Post, on_delete=models.CASCADE)
#     content = models.TextField(max_length=256)






