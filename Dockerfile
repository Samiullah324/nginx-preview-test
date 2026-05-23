FROM nginx:1.27-alpine
RUN mkdir -p /usr/share/nginx/html/assets
COPY index.html /usr/share/nginx/html/index.html
COPY styles.css /usr/share/nginx/html/styles.css
COPY assets/logo.svg /usr/share/nginx/html/assets/logo.svg
COPY health.txt /usr/share/nginx/html/health
EXPOSE 80
