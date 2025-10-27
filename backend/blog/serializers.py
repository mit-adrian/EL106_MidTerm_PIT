# backend/blog/serializers.py
from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Post
        fields = ('id','title','slug','content','author','status','created_at','updated_at','published_at')
        read_only_fields = ('author','created_at','updated_at','published_at')
