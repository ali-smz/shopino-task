"""
Utility functions for the links app.
Follows Single Responsibility Principle by grouping related utilities.
"""

import string
import random
from django.db import models
from django.http import HttpRequest


def generate_unique_slug(length: int = 6, repository=None) -> str:
    """
    Generate a unique slug for a link.
    
    Args:
        length: Length of the slug (default: 6)
        repository: Optional LinkRepository instance for checking slug existence
        
    Returns:
        Unique slug string
    """
    from .repositories import LinkRepository
    
    repository = repository or LinkRepository()
    chars = string.ascii_letters + string.digits
    max_attempts = 100
    
    for _ in range(max_attempts):
        slug = ''.join(random.choices(chars, k=length))
        if not repository.slug_exists(slug):
            return slug
    
    # If we couldn't generate a unique slug in max_attempts, increase length
    return generate_unique_slug(length + 1, repository)


def get_client_ip(request: HttpRequest) -> str:
    """
    Extract client IP address from request.
    
    Args:
        request: The HTTP request object
        
    Returns:
        Client IP address as string
    """
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        # Get the first IP in the chain (original client)
        ip = x_forwarded_for.split(',')[0].strip()
    else:
        ip = request.META.get('REMOTE_ADDR', '')
    return ip
