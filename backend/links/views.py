"""
Views for the links app.
Follows SOLID principles:
- Single Responsibility: Each view has one clear purpose
- Dependency Inversion: Views depend on service abstractions via default instances
"""

from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response
from django.shortcuts import redirect

from .models import Link
from .serializers import LinkSerializer, AnalyticsSerializer
from .services import get_default_services
from .exceptions import LinkNotFoundError


# Get default service instances (can be overridden for testing)
_link_service, _click_service, _analytics_service = get_default_services()


class LinkListAPIView(generics.ListAPIView):
    """
    API view for listing all links.
    Follows Single Responsibility Principle.
    """
    serializer_class = LinkSerializer
    
    def get_queryset(self):
        """Get queryset using service layer."""
        return _link_service.get_all_links()


class LinkCreateAPIView(generics.CreateAPIView):
    """
    API view for creating a new shortened link.
    Follows Single Responsibility Principle.
    """
    serializer_class = LinkSerializer
    queryset = Link.objects.all()


class RedirectAPIView(APIView):
    """
    API view for redirecting short URLs to original URLs.
    Follows Single Responsibility Principle by delegating to services.
    """
    
    def get(self, request, slug):
        """
        Handle GET request to redirect short URL.
        
        Args:
            request: HTTP request object
            slug: Short URL slug
            
        Returns:
            Redirect response to original URL
            
        Raises:
            LinkNotFoundError: If link is not found
        """
        # Get link using service layer
        link = _link_service.get_link_by_slug(slug)
        if not link:
            raise LinkNotFoundError()
        
        # Record click using service layer
        _click_service.record_click(link, request)
        
        return redirect(link.original_url)


class AnalyticsAPIView(APIView):
    """
    API view for retrieving analytics data for a link.
    Follows Single Responsibility Principle by delegating to services.
    """
    
    def get(self, request, slug):
        """
        Handle GET request to retrieve analytics.
        
        Args:
            request: HTTP request object
            slug: Short URL slug
            
        Returns:
            JSON response with analytics data
            
        Raises:
            LinkNotFoundError: If link is not found
        """
        # Get link using service layer
        link = _link_service.get_link_by_slug(slug)
        if not link:
            raise LinkNotFoundError()
        
        # Get analytics using service layer
        analytics_data = _analytics_service.get_analytics_data(link)
        
        # Validate and serialize response
        serializer = AnalyticsSerializer(data=analytics_data)
        serializer.is_valid(raise_exception=True)
        
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
