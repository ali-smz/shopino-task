from django.urls import path
from .views import LinkCreateAPIView, RedirectAPIView, AnalyticsAPIView , LinkListAPIView

urlpatterns = [
    path('api/shorten/', LinkCreateAPIView.as_view(), name='shorten'),
    path('api/links/', LinkListAPIView.as_view(), name='links-list'),
    path('<slug:slug>/', RedirectAPIView.as_view(), name='redirect'),
    path('api/analytics/<slug:slug>/', AnalyticsAPIView.as_view(), name='analytics'),
]
