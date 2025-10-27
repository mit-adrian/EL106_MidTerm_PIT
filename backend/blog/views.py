# backend/blog/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.utils import timezone
from django.db.models import Q

from .models import Post
from .serializers import PostSerializer

class PostViewSet(viewsets.ModelViewSet):
    """
    Post viewset with role-based access:
    - Writers: see their own posts + published posts
    - Admins/Managers: cannot access blog feed (data dashboard only)
    - Unauthenticated users: see only published posts
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user

        # Admins and managers do not access blog feed
        if user.is_authenticated and (getattr(user, "is_admin", lambda: False)() or getattr(user, "is_manager", lambda: False)()):
            raise PermissionDenied("Admins and managers cannot access blog feed.")

        # Writers see their own posts + published posts
        if user.is_authenticated and getattr(user, "is_writer", lambda: False)():
            return Post.objects.filter(Q(status=Post.STATUS_PUBLISHED) | Q(author=user))

        # Unauthenticated users see only published posts
        return Post.objects.filter(status=Post.STATUS_PUBLISHED)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def perform_update(self, serializer):
        post = serializer.instance
        new_status = serializer.validated_data.get('status', post.status)
        user = self.request.user

        # Only manager or admin can publish
        if new_status == Post.STATUS_PUBLISHED and not (user.is_authenticated and (user.is_admin()() or user.is_manager()())):
            raise PermissionDenied("Only manager or admin can publish posts.")

        # Update published_at timestamp when publishing for the first time
        if new_status == Post.STATUS_PUBLISHED and post.status != Post.STATUS_PUBLISHED:
            post.published_at = timezone.now()

        serializer.save()
