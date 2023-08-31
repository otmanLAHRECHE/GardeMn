# Generated by Django 4.2.4 on 2023-08-31 16:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Month',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('month', models.IntegerField()),
                ('year', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Workers',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('prename', models.CharField(max_length=200)),
                ('service', models.CharField(max_length=200)),
                ('grade', models.CharField(max_length=200)),
                ('ccp', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Garde',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('jn', models.IntegerField()),
                ('jw', models.IntegerField()),
                ('jf', models.IntegerField()),
                ('month', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.month')),
                ('worker', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.workers')),
            ],
        ),
    ]
