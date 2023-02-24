from fileinput import filename
import os.path, time
import warnings
warnings.simplefilter("ignore")
import konlpy
konlpy.__version__
from konlpy.tag import *
hannanum = Hannanum()
kkma = Kkma()
komoran = Komoran()
import matplotlib.pyplot as plt
from wordcloud import WordCloud
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')
# from botocore.exceptions import ClientError
from konlpy.tag import Twitter
from collections import Counter
import datetime

#f = open("C:/gjci.txt", "r",encoding="utf-8")


def CreateWordcloud (file):
    
    print(file)
    #명사 빈도 카운트
    nlpy = Twitter()
    nouns = nlpy.nouns(file)
    print(nouns)
    count = Counter(nouns)
    tag_count = []
    tags = []

    #가장 많이 쓰는 단어 카운트 
    for n, c in count.most_common(100):
        dics = {'tag': n, 'count': c}
        if len(dics['tag']) >= 2 and len(tags) <= 49:
            tag_count.append(dics)
            tags.append(dics['tag'])
    for tag in tag_count:
        print(" {:<14}".format(tag['tag']), end='\t')
        print("{}".format(tag['count']))
        
    wc = WordCloud(font_path='malgun', width=200, height=200, scale=2.0, max_font_size=250)
    gen = wc.generate_from_frequencies(count) 
    fig = plt.figure()
    plt.imshow(gen)
    plt.show()
    #file = time.strftime("%Y%m%d-%H%M%S")

    fig.savefig("C:/Users/ssh99/restful test/nodejs-express-mysql/controllers/outputs/{}".format(file))

    
    

   



if __name__ == "__main__":
    CreateWordcloud(sys.argv[1])