from django.utils import timezone
from django.db import models
import uuid
from django.core import validators
from django.db.models import Q
from user.models import User



class Task(models.Model):
    CATEGORY_CHOICES = [
        ('work', '作業'),
        ('meeting', '会議・打ち合わせ'),
        ('go_out', '外出'),
        ('event', 'イベント'),
        ('other', 'その他'),
    ]
    STATUS_CHOICES = [
        ('todo', '未着手'),
        ('doing', '進行中'),
        ('undecided', '未定'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    content = models.TextField(max_length=500)
    category = models.CharField(
        max_length=10,
        choices=CATEGORY_CHOICES,
        default='work'
    )
    start_date = models.DateField(default=timezone.now, blank=True, null=True)
    end_date = models.DateField(default=timezone.now, blank=True, null=True)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='todo'
    )
    is_done = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.title
