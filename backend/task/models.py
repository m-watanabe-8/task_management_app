from django.utils import timezone
from django.db import models
import uuid
from django.core import validators


class TaskStatusModel(models.Model):
    PRIORITY_CHOICES = [
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4),
        (5, 5),
    ]

    status = models.CharField(max_length=10, default='none')
    # 優先度(1~10)
    priority = models.IntegerField(
        choices=PRIORITY_CHOICES,
        default='1'
    )

    def __str__(self):
        return self.status

class Task(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    content = models.TextField(max_length=500)
    start_date = models.DateTimeField(default=timezone.now, blank=True, null=True)
    end_date = models.DateTimeField(default=timezone.now, blank=True, null=True)
    # 進行度(0~100)
    progress = models.IntegerField(
        default=0,
        validators=[validators.MinValueValidator(0),
                    validators.MaxValueValidator(100)]
    )
    # TaskStatusModelからchoicesを取得する
    status = models.ForeignKey(TaskStatusModel, on_delete=models.SET_NULL, null=True, blank=True)
    is_done = models.BooleanField(default=False)

    def __str__(self):
        return self.title
