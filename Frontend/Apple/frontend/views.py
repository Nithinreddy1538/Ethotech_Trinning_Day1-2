from django.db.models import Count
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser

from music.models import Song
from history.models import ListeningHistory

class AdminAnalyticsView(APIView):
    """
    A view to provide analytics data for the admin dashboard.
    Requires admin user privileges.
    """
    permission_classes = [IsAdminUser]

    def get(self, request, format=None):
        total_users = User.objects.count()
        total_songs = Song.objects.count()

        # Get top 5 most played songs
        top_songs = ListeningHistory.objects.values('song__title', 'song__artist__name') \
            .annotate(play_count=Count('song')) \
            .order_by('-play_count')[:5]

        data = {
            'total_users': total_users,
            'total_songs': total_songs,
            'top_songs': list(top_songs),
        }
        return Response(data)