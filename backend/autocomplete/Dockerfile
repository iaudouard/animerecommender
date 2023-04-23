FROM python:3.10.11-bullseye

WORKDIR /usr/src/app

ADD requirements.txt requirements.txt
RUN pip install -r requirements.txt

ADD . .

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]