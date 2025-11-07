"""
Repository for Link model data access.
Follows Single Responsibility Principle by isolating data access logic.
"""

from typing import Optional
from django.db.models import QuerySet
from ..models import Link


class LinkRepository:
    """
    Repository for Link data access operations.
    Encapsulates all database operations related to Link model.
    """
    
    @staticmethod
    def create(original_url: str, slug: str) -> Link:
        """
        Create a new link in the database.
        
        Args:
            original_url: The original URL
            slug: The unique slug for the link
            
        Returns:
            Created Link instance
        """
        return Link.objects.create(original_url=original_url, slug=slug)
    
    @staticmethod
    def get_by_slug(slug: str) -> Optional[Link]:
        """
        Retrieve a link by its slug.
        
        Args:
            slug: The link slug
            
        Returns:
            Link instance or None if not found
        """
        try:
            return Link.objects.get(slug=slug)
        except Link.DoesNotExist:
            return None
    
    @staticmethod
    def get_all() -> QuerySet:
        """
        Retrieve all links ordered by creation date.
        
        Returns:
            QuerySet of all links
        """
        return Link.objects.all().order_by('-created_at')
    
    @staticmethod
    def slug_exists(slug: str) -> bool:
        """
        Check if a slug already exists.
        
        Args:
            slug: The slug to check
            
        Returns:
            True if slug exists, False otherwise
        """
        return Link.objects.filter(slug=slug).exists()
    
    @staticmethod
    def update_click_count(link: Link, count: int) -> None:
        """
        Update the click count for a link.
        
        Args:
            link: The Link instance
            count: The new click count
        """
        link.click_count = count
        link.save(update_fields=['click_count'])

