from django.contrib.auth.models import User
from rest_framework import viewsets, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from .models import Movie, Rating
from .serializers import MovieSerializer, RatingSerializer, UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    @action(detail=True, methods=['POST'])
    def rate_movie(self, request, pk=None):
        if 'stars' in request.data:
            stars = request.data['stars']
            movie = Movie.objects.get(id=pk)
            user = request.user

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
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def update(self, request, *args, **kwargs):
        responce = {'message': 'Yo cant update like this!'}
        return Response(responce, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        responce = {'message': 'Yo cant create like this!'}
        return Response(responce, status=status.HTTP_400_BAD_REQUEST)
