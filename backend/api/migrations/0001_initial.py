# Generated by Django 4.1.3 on 2023-01-14 19:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.CharField(editable=False, max_length=200, primary_key=True, serialize=False, unique=True)),
                ('title', models.CharField(blank=True, max_length=200, null=True)),
                ('likes', models.IntegerField(default=0)),
                ('content', models.CharField(blank=True, max_length=256, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='images/')),
                ('location', models.CharField(blank=True, max_length=256, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.CharField(editable=False, max_length=200, primary_key=True, serialize=False, unique=True)),
                ('content', models.TextField(max_length=256)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.post')),
            ],
        ),
    ]
