from rest_framework import viewsets

from .models import Project, Record
from .serializers import ProjectSerializer, RecordSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = "slug"


class RecordViewSet(viewsets.ModelViewSet):
    queryset = Record.objects.select_related('project').all()
    serializer_class = RecordSerializer
    