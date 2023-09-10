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

    def month_word(self):
        la = ""
        if(self.month == 1):
            la = "Janvier"
        elif(self.month == 2):
            la = "Février"
        elif(self.month == 3):
            la = "Mars"
        elif(self.month == 4):
            la = "Avrile"
        elif(self.month == 5):
            la = "Mai"
        elif(self.month == 6):
            la = "Juin"
        elif(self.month == 7):
            la = "Juillet"
        elif(self.month == 8):
            la = "Août"
        elif(self.month == 9):
            la = "Septembre"
        elif(self.month == 10):
            la = "Octobre"
        elif(self.month == 11):
            la = "November"
        elif(self.month == 12):
            la = "Décembre"
        return la
    


class Garde(models.Model):
    id = models.AutoField(primary_key=True)
    jn = models.IntegerField()
    jw = models.IntegerField()
    jf = models.IntegerField()
    worker = models.ForeignKey(Workers, on_delete=models.CASCADE)
    month = models.ForeignKey(Month, on_delete=models.CASCADE)

    def __str__(self):
        return self.id
    

class Solde(models.Model):
    id = models.AutoField(primary_key=True)
    net = models.FloatField()
    garde = models.ForeignKey(Garde, on_delete=models.CASCADE)
    month = models.ForeignKey(Month, on_delete=models.CASCADE)

    def __str__(self):
        return self.id
    
    def assurance(self):
        ass_v = self.net * 0.09
        ass_v = ass_v = round(ass_v, 2)
        return ass_v

    def m_assurance(self):
        ass_v = self.net * 0.09
        ass_v = ass_v = round(ass_v, 2)
        m_s = self.net - ass_v
        m_s = m_s * 0.05
        m_s = round(m_s, 2)
        return m_s

    def taxes(self):
        
        ass_v = self.net * 0.09
        ass_v = ass_v = round(ass_v, 2)
        m_s = self.net - ass_v
        m_s = m_s * 0.05
        m_s = round(m_s, 2)

        t = m_s + ass_v
        t = round(t, 2)
        return t

    def sld(self):
        ass_v = self.net * 0.09
        ass_v = ass_v = round(ass_v, 2)
        m_s = self.net - ass_v
        m_s = m_s * 0.05
        m_s = round(m_s, 2)

        t = m_s + ass_v
        t = round(t, 2)
        s = self.net - t
        return s
    
    def work(self):
        return self.garde.worker.name +" "+ self.garde.worker.prename

    def cp(self):
        return self.garde.worker.ccp


