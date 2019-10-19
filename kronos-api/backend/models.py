from datetime import datetime, timedelta, timezone

from django.db import models

class Project(models.Model):
    slug = models.SlugField(max_length=100, unique=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=255, blank=True)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created']

    def __str__(self):
        return self.name


class Record(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    stop_time = models.DateTimeField(blank=True, null=True)

    @property
    def duration(self) -> timedelta:
        if self.stop_time is not None:
            return self.stop_time - self.start_time
        else:
            return datetime.now(timezone.utc) - self.start_time

    class Meta:
        ordering = ['-start_time']

    def __str__(self):
        return f"{self.project} ({self.start_time})"



