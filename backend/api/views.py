
# Create your views here.

from rest_framework import viewsets,status
from .models import Post
from .serializers import PostSerializer
import uuid
from rest_framework.response import Response

# class CommentViewSet(viewsets.ModelViewSet):
#     queryset = Comment.objects.all()
#     serializer_class = CommentSerializer
    

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

