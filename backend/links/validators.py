"""
URL validation utilities.
Follows Single Responsibility Principle by centralizing validation logic.
"""

import re
from urllib.parse import urlparse
from .exceptions import InvalidURLError


class URLValidator:
    """
    URL validator for link URLs.
    Provides centralized URL validation logic.
    """
    
    # Simple URL pattern for validation
    URL_PATTERN = re.compile(
        r'^https?://'  # http:// or https://
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?|'  # domain...
        r'localhost|'  # localhost...
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # ...or ip
        r'(?::\d+)?'  # optional port
        r'(?:/?|[/?]\S+)$', re.IGNORECASE
    )
    
    @staticmethod
    def validate(url: str) -> str:
        """
        Validate and normalize a URL.
        
        Args:
            url: URL string to validate
            
        Returns:
            Normalized URL string
            
        Raises:
            InvalidURLError: If URL is invalid
        """
        if not url or not url.strip():
            raise InvalidURLError("URL cannot be empty")
        
        url = url.strip()
        
        # Add protocol if missing
        if not url.startswith(('http://', 'https://')):
            url = 'https://' + url
        
        # Parse URL to validate structure
        parsed = urlparse(url)
        if not parsed.netloc:
            raise InvalidURLError("Invalid URL format")
        
        # Basic pattern validation
        if not URLValidator.URL_PATTERN.match(url):
            raise InvalidURLError("Invalid URL format")
        
        return url

