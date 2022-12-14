# Generated by Django 4.0.3 on 2022-04-18 08:25

import backend.storage_backends
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dfs', '0008_alter_version_reference'),
    ]

    operations = [
        migrations.AlterField(
            model_name='temporary_dataset',
            name='reference',
            field=models.FileField(blank=True, storage=backend.storage_backends.PrivateMediaStorage(), upload_to=''),
        ),
        migrations.AlterField(
            model_name='version',
            name='reference',
            field=models.FileField(storage=backend.storage_backends.PublicMediaStorage(), upload_to=''),
        ),
    ]
