from rest_framework import serializers

from .models import Movie, Rating


class MovieSerializer(serializers.Serializer):
    class Meta:
        model = Movie
        fields = ['id', 'title', 'description']


class RatingSerializer(serializers.Serializer):
    class Meta:
        model = Rating
        fields = ['id', 'stars', 'user', 'movie']
