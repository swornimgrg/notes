from django.db import models
from django.utils import timezone


class Note(models.Model):
    title = models.CharField(max_length=64)
    content = models.TextField(blank=True, null=True)
    archived = models.BooleanField(default=False)
    pinned = models.BooleanField(default=False)
    created_date = models.DateTimeField(blank=True)
    last_modified = models.DateTimeField(blank=True)

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        if self.pk is None:
            self.created_date = timezone.now()
        self.last_modified = timezone.now()
        super().save(force_insert, force_update, using, update_fields)
