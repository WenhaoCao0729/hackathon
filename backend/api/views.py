
# Create your views here.

from rest_framework import viewsets
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer
import uuid

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        post = serializer.save()
        post.id = f"{request.build_absolute_uri('/')}api/posts/{str(uuid.uuid4())}"
        post.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

