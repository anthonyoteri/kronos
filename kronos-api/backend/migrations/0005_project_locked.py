# Generated by Django 2.2.6 on 2019-10-23 15:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_auto_20191018_1629'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='locked',
            field=models.BooleanField(default=False),
        ),
    ]
