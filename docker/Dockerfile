FROM flexbls

WORKDIR /flex

# timezone:
ENV TZ=Europe/London

# Copy folders:
COPY app app
COPY frontend frontend
COPY requirements requirements

# Config files:
COPY .env .env
COPY gunicorn.conf.py gunicorn.conf.py
COPY pyproject.toml pyproject.toml
COPY supervisor.apps.ini supervisor.apps.ini
COPY supervisord.conf supervisord.conf

# Install weasyprint requirements:
#RUN apk add py3-pip gcc musl-dev  \
#    python3-dev pango zlib-dev jpeg-dev  \
#    openjpeg-dev g++ libffi-dev

# Install weasyprint fonts:
#RUN apk add --update --upgrade --no-cache  \
#    fontconfig ttf-freefont font-noto  \
#    terminus-font && fc-cache -f && fc-list | sort

# Install pip requirements:
RUN pip install --upgrade pip
RUN pip install -r requirements/production.txt

# Compile frontend:
RUN vt pack transport -m docker-production

# START
ENTRYPOINT ["supervisord", "-c", "supervisord.conf"]
