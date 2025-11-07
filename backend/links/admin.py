"""
Admin configuration for links app.
Follows Single Responsibility Principle by organizing admin interfaces.
"""

from django.contrib import admin
from .models import Link, Click


@admin.register(Link)
class LinkAdmin(admin.ModelAdmin):
    """
    Admin interface for Link model.
    Provides organized display and filtering options.
    """
    list_display = ('slug', 'original_url', 'click_count', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('slug', 'original_url')
    readonly_fields = ('slug', 'created_at', 'click_count')
    ordering = ('-created_at',)
    
    fieldsets = (
        ('Link Information', {
            'fields': ('slug', 'original_url', 'click_count')
        }),
        ('Timestamps', {
            'fields': ('created_at',)
        }),
    )


@admin.register(Click)
class ClickAdmin(admin.ModelAdmin):
    """
    Admin interface for Click model.
    Provides organized display and filtering options.
    """
    list_display = ('short_url', 'ip_address', 'timestamp', 'referrer')
    list_filter = ('timestamp', 'short_url')
    search_fields = ('ip_address', 'user_agent', 'short_url__slug')
    readonly_fields = ('timestamp',)
    ordering = ('-timestamp',)
    
    fieldsets = (
        ('Click Information', {
            'fields': ('short_url', 'ip_address', 'user_agent', 'referrer')
        }),
        ('Timestamps', {
            'fields': ('timestamp',)
        }),
    )
