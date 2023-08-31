from django.db import models


class Workers(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    prename = models.CharField(max_length=200)
    service = models.CharField(max_length=200)
    grade = models.CharField(max_length=200)
    ccp = models.CharField(max_length=200)

    def __str__(self):
        return self.id
    

class Month(models.Model):
    id = models.AutoField(primary_key=True)
    month = models.IntegerField()
    year = models.IntegerField()

    def __str__(self):
        return self.id
    


class Garde(models.Model):
    id = models.AutoField(primary_key=True)
    jn = models.IntegerField()
    jw = models.IntegerField()
    jf = models.IntegerField()
    worker = models.ForeignKey(Workers, on_delete=models.CASCADE)
    month = models.ForeignKey(Month, on_delete=models.CASCADE)

    def __str__(self):
        return self.id


