from rest_framework import serializers

from .models import Project, Record

class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ('slug', 'name', 'url', 'description', 'locked', 'last_used', 'created', 'updated')
        extra_kwargs = {"url": {"lookup_field": "slug"}}



class RecordSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Record
        fields = ('url', "project", "start_time", "stop_time", "duration")

    
    project = serializers.SlugRelatedField(slug_field="slug", queryset=Project.objects.all())
