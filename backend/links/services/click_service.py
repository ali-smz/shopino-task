"""
Click service for handling click tracking business logic.
Follows Single Responsibility Principle and Dependency Inversion Principle.
"""

from django.db import transaction
from django.http import HttpRequest
from ..models import Link, Click
from ..repositories import ClickRepository, LinkRepository
from ..utils import get_client_ip


class ClickService:
    """
    Service for click tracking business logic.
    Handles click recording and incrementing click counts.
    Follows Dependency Inversion Principle by depending on repository abstractions.
    """
    
    def __init__(self, click_repository: ClickRepository = None, link_repository: LinkRepository = None):
        """
        Initialize ClickService with optional repository dependencies.
        
        Args:
            click_repository: ClickRepository instance (defaults to new instance)
            link_repository: LinkRepository instance (defaults to new instance)
        """
        self.click_repository = click_repository or ClickRepository()
        self.link_repository = link_repository or LinkRepository()
    
    def record_click(self, link: Link, request: HttpRequest) -> Click:
        """
        Record a click for a link and increment the click count.
        
        Args:
            link: The Link instance that was clicked
            request: The HTTP request object
            
        Returns:
            Created Click instance
        """
        with transaction.atomic():
            # Increment click count atomically
            link.click_count += 1
            self.link_repository.update_click_count(link, link.click_count)
            
            # Create click record
            click = self.click_repository.create(
                link=link,
                ip_address=get_client_ip(request),
                user_agent=request.META.get('HTTP_USER_AGENT', ''),
                referrer=request.META.get('HTTP_REFERER', '')
            )
        
        return click
    
    def get_clicks_for_link(self, link: Link):
        """
        Retrieve all clicks for a specific link.
        
        Args:
            link: The Link instance
            
        Returns:
            QuerySet of clicks ordered by timestamp (newest first)
        """
        return self.click_repository.get_by_link(link)


# Default service instance for backward compatibility
_default_service = ClickService()

