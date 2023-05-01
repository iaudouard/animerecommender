FROM python:3.10.11-bullseye

WORKDIR /usr/src/app

ADD requirements.txt requirements.txt
RUN pip install -r requirements.txt

ADD . .

# Run the web service on container startup.
CMD exec functions-framework --target=goblet_entrypoint