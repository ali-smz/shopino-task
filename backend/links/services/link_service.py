"""
Link service for handling link-related business logic.
Follows Single Responsibility Principle and Dependency Inversion Principle.
"""

from typing import Optional
from django.db import transaction
from django.core.exceptions import ValidationError
from ..models import Link
from ..repositories import LinkRepository
from ..utils import generate_unique_slug
from ..exceptions import InvalidURLError
from ..validators import URLValidator


class LinkService:
    """
    Service for link business logic.
    Handles link creation and retrieval operations.
    Follows Dependency Inversion Principle by depending on repository abstraction.
    """
    
    def __init__(self, repository: LinkRepository = None):
        """
        Initialize LinkService with optional repository dependency.
        
        Args:
            repository: LinkRepository instance (defaults to new instance)
        """
        self.repository = repository or LinkRepository()
    
    def create_link(self, original_url: str) -> Link:
        """
        Create a new shortened link.
        
        Args:
            original_url: The original URL to shorten
            
        Returns:
            Created Link instance
            
        Raises:
            InvalidURLError: If URL validation fails
        """
        # Validate and normalize URL
        normalized_url = URLValidator.validate(original_url)
        
        try:
            with transaction.atomic():
                slug = generate_unique_slug(repository=self.repository)
                link = self.repository.create(
                    original_url=normalized_url,
                    slug=slug
                )
            return link
        except ValidationError as e:
            raise InvalidURLError(f"Invalid URL: {str(e)}")
    
    def get_link_by_slug(self, slug: str) -> Optional[Link]:
        """
        Retrieve a link by its slug.
        
        Args:
            slug: The link slug
            
        Returns:
            Link instance or None if not found
        """
        return self.repository.get_by_slug(slug)
    
    def get_all_links(self):
        """
        Retrieve all links ordered by creation date.
        
        Returns:
            QuerySet of all links
        """
        return self.repository.get_all()


# Default service instance for backward compatibility
_default_service = LinkService()

