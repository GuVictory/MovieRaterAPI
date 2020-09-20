from django.contrib.auth.models import User
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Movie, Rating
from .serializers import MovieSerializer, RatingSerializer


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    @action(detail=True, methods=['POST'])
    def rate_movie(self, request, pk=None):
        if 'stars' in request.data:
            stars = request.data['stars']
            movie = Movie.objects.get(id=pk)
            print('Movie', movie.id)
            # user = request.user
            user = User.objects.get(id=1)  # TODO: Потом убрать заглушку и настроить проверку залогиненого пользователя

            try:
                rating = Rating.objects.get(movie=movie.id, user=user.id)
                rating.stars = stars
                rating.save()
                serializer = RatingSerializer(rating, many=False)
                responce = {'message': 'Rating updates', 'result': serializer.data}
                return Response(responce, status=status.HTTP_200_OK)
            except:
                rating = Rating.objects.create(user=user, movie=movie, stars=stars)
                serializer = RatingSerializer(rating, many=False)
                responce = {'message': 'Rating created', 'result': serializer.data}
                return Response(responce, status=status.HTTP_201_CREATED)

            responce = {'message': 'Hey, I need starts!!'}
            return Response(responce, status=status.HTTP_400_BAD_REQUEST)

        else:
            responce = {'message': 'Hey, I need starts!!'}
            return Response(responce, status=status.HTTP_400_BAD_REQUEST)


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
