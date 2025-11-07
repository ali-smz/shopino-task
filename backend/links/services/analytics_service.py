"""
Analytics service for handling analytics business logic.
Follows Single Responsibility Principle and Dependency Inversion Principle.
"""

from typing import Dict
from ..models import Link
from ..repositories import ClickRepository


class AnalyticsService:
    """
    Service for analytics business logic.
    Handles analytics data aggregation and formatting.
    Follows Dependency Inversion Principle by depending on repository abstraction.
    Follows Single Responsibility Principle by delegating click retrieval to ClickRepository.
    """
    
    def __init__(self, click_repository: ClickRepository = None):
        """
        Initialize AnalyticsService with optional repository dependency.
        
        Args:
            click_repository: ClickRepository instance (defaults to new instance)
        """
        self.click_repository = click_repository or ClickRepository()
    
    def get_analytics_data(self, link: Link) -> Dict:
        """
        Get analytics data for a link.
        
        Args:
            link: The Link instance
            
        Returns:
            Dictionary containing analytics data
        """
        clicks = self.click_repository.get_by_link(link)
        total_clicks = self.click_repository.count_by_link(link)
        
        click_details = [
            {
                "timestamp": click.timestamp.isoformat(),
                "ip_address": str(click.ip_address),
                "user_agent": click.user_agent,
                "referrer": click.referrer or None,
            }
            for click in clicks
        ]
        
        return {
            "slug": link.slug,
            "original_url": link.original_url,
            "total_clicks": total_clicks,
            "clicks": click_details,
        }


# Default service instance for backward compatibility
_default_service = AnalyticsService()

