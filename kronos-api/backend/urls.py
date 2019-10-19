from rest_framework import routers

from .api import ProjectViewSet, RecordViewSet

router = routers.DefaultRouter()
router.register('projects', ProjectViewSet)
router.register('records', RecordViewSet)

urlpatterns = router.urls