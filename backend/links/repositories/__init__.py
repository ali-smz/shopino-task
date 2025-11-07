"""
Repository layer for data access.
Follows Dependency Inversion Principle by abstracting data access.
"""

from .link_repository import LinkRepository
from .click_repository import ClickRepository

__all__ = ['LinkRepository', 'ClickRepository']

