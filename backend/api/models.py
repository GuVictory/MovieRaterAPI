from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class Movie(models.Model):
    title = models.CharField(max_length=32, default='')
    description = models.TextField(max_length=380, blank=True)

    def no_of_ratings(self):
        ratings = Rating.objects.filter(movie=self)
        return len(ratings)
    
    def avg_rating(self):
        ratings = Rating.objects.filter(movie=self)
        rate_sum = 0
        for rate in ratings:
            rate_sum += rate.stars

        return 0 if len(ratings) == 0 else rate_sum / len(ratings)


class Rating(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stars = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])

    class Meta:
        unique_together = (('user', 'movie'),)
        index_together = (('user', 'movie'),)
