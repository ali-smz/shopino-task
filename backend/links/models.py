from django.db import models
from django.utils.text import slugify

# Create your models here.
class Link(models.Model):
    original_url = models.URLField()
    slug = models.CharField(max_length=10, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    click_count = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.slug} -> {self.original_url}"

class Click(models.Model):
    short_url = models.ForeignKey(Link, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField()
    referrer = models.URLField(null=True, blank=True)