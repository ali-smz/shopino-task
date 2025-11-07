"""
Service layer for business logic.
Follows Single Responsibility Principle by separating business logic from views.
"""

from .link_service import LinkService, _default_service as default_link_service
from .click_service import ClickService, _default_service as default_click_service
from .analytics_service import AnalyticsService, _default_service as default_analytics_service

__all__ = ['LinkService', 'ClickService', 'AnalyticsService']

# Export default instances for backward compatibility
def get_default_services():
    """
    Get default service instances.
    Useful for views that don't need dependency injection.
    
    Returns:
        Tuple of (LinkService, ClickService, AnalyticsService)
    """
    return default_link_service, default_click_service, default_analytics_service

