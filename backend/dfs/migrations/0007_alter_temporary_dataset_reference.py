# Generated by Django 4.0.3 on 2022-04-18 07:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dfs', '0006_alter_dataset_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='temporary_dataset',
            name='reference',
            field=models.FileField(upload_to='files/'),
        ),
    ]
