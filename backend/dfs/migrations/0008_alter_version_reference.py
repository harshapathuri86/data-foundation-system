# Generated by Django 4.0.3 on 2022-04-18 07:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dfs', '0007_alter_temporary_dataset_reference'),
    ]

    operations = [
        migrations.AlterField(
            model_name='version',
            name='reference',
            field=models.FileField(upload_to='files/'),
        ),
    ]
