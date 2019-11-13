from django.db import models
from rest_framework import serializers

from .models import Project, Record


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('slug', 'name', 'description', 'locked', 'last_used', 'created', 'updated')


class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = ('id', "project", "start_time", "stop_time")

    project = serializers.SlugRelatedField(slug_field="slug", queryset=Project.objects.all())
