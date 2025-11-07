"""
Repository for Click model data access.
Follows Single Responsibility Principle by isolating data access logic.
"""

from django.db.models import QuerySet
from ..models import Link, Click


class ClickRepository:
    """
    Repository for Click data access operations.
    Encapsulates all database operations related to Click model.
    """
    
    @staticmethod
    def create(link: Link, ip_address: str, user_agent: str, referrer: str = '') -> Click:
        """
        Create a new click record in the database.
        
        Args:
            link: The Link instance
            ip_address: Client IP address
            user_agent: User agent string
            referrer: Referrer URL (optional, defaults to empty string)
            
        Returns:
            Created Click instance
        """
        return Click.objects.create(
            short_url=link,
            ip_address=ip_address,
            user_agent=user_agent,
            referrer=referrer
        )
    
    @staticmethod
    def get_by_link(link: Link) -> QuerySet:
        """
        Retrieve all clicks for a specific link.
        
        Args:
            link: The Link instance
            
        Returns:
            QuerySet of clicks ordered by timestamp (newest first)
        """
        return Click.objects.filter(short_url=link).order_by('-timestamp')
    
    @staticmethod
    def count_by_link(link: Link) -> int:
        """
        Count clicks for a specific link.
        
        Args:
            link: The Link instance
            
        Returns:
            Number of clicks
        """
        return Click.objects.filter(short_url=link).count()

