"""
Serializers for the links app.
Follows Single Responsibility Principle by separating serialization logic.
"""

from rest_framework import serializers
from .models import Link


class LinkSerializer(serializers.ModelSerializer):
    """
    Serializer for Link model.
    Handles serialization and validation of link data.
    """
    
    class Meta:
        model = Link
        fields = ['original_url', 'slug', 'created_at', 'click_count']
        read_only_fields = ['slug', 'created_at', 'click_count']
    
    def validate_original_url(self, value: str) -> str:
        """
        Validate the original URL.
        
        Args:
            value: URL string to validate
            
        Returns:
            Validated URL string
            
        Raises:
            serializers.ValidationError: If URL is invalid
        """
        if not value or not value.strip():
            raise serializers.ValidationError("URL cannot be empty")
        return value.strip()
    
    def create(self, validated_data):
        """
        Create a new link using the service layer.
        Follows Dependency Inversion Principle by using service instead of direct model access.
        """
        from .services import get_default_services
        link_service, _, _ = get_default_services()
        return link_service.create_link(validated_data['original_url'])


class ClickDetailSerializer(serializers.Serializer):
    """
    Serializer for click details in analytics.
    """
    timestamp = serializers.DateTimeField()
    ip_address = serializers.IPAddressField()
    user_agent = serializers.CharField()
    referrer = serializers.URLField(allow_null=True, required=False)


class AnalyticsSerializer(serializers.Serializer):
    """
    Serializer for analytics data.
    """
    slug = serializers.CharField()
    original_url = serializers.URLField()
    total_clicks = serializers.IntegerField()
    clicks = ClickDetailSerializer(many=True)
