"""
Custom exceptions for the links app.
Follows Single Responsibility Principle by centralizing exception definitions.
"""

from rest_framework import status
from rest_framework.exceptions import APIException


class LinkNotFoundError(APIException):
    """Exception raised when a link is not found."""
    status_code = status.HTTP_404_NOT_FOUND
    default_detail = "Link not found."
    default_code = "link_not_found"


class InvalidURLError(APIException):
    """Exception raised when URL validation fails."""
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = "Invalid URL provided."
    default_code = "invalid_url"

