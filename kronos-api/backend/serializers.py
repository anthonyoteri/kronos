from django.db import models
from rest_framework import serializers

from .models import Project, Record

class GeneratorListSerializer(serializers.ListSerializer):
    def to_representation(self, data):
        if isinstance(data, models.Manager):
            iterable = data.all().iterator()
        elif isinstance(data, models.query.QuerySet):
            iterable = data.iterator()
        else:
            iterable = data

        return (self.child.to_representation(item) for item in iterable)

    @property
    def data(self):
        return super(serializers.ListSerializer, self).data


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('slug', 'name', 'description', 'locked', 'last_used', 'created', 'updated')
        list_serializer_class = GeneratorListSerializer


class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = ('id', "project", "start_time", "stop_time")
        list_serializer_class = GeneratorListSerializer

    project = serializers.SlugRelatedField(slug_field="slug", queryset=Project.objects.all())
