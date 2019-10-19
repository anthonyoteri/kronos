from rest_framework import serializers

from .models import Project, Record

class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ('slug', 'name', 'url', 'description', 'created', 'updated')
        extra_kwargs = {"url": {"lookup_field": "slug"}}



class RecordSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Record
        fields = ('url', "project", "start_time", "stop_time", "duration")

    
    project = serializers.HyperlinkedRelatedField(lookup_field="slug", view_name="project-detail", queryset=Project.objects.all())
