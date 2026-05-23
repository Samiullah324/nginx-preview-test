FROM nginx:1.27-alpine
RUN mkdir -p /usr/share/nginx/html
COPY index.html /usr/share/nginx/html/index.html
COPY signup.html /usr/share/nginx/html/signup.html
COPY signup.css /usr/share/nginx/html/signup.css
COPY health.txt /usr/share/nginx/html/health
EXPOSE 80
