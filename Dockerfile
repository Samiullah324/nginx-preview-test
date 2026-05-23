FROM nginx:1.27-alpine
RUN mkdir -p /usr/share/nginx/html/signup
COPY index.html /usr/share/nginx/html/index.html
COPY health.txt /usr/share/nginx/html/health
COPY signup/index.html /usr/share/nginx/html/signup/index.html
COPY signup/signup.css /usr/share/nginx/html/signup/signup.css
EXPOSE 80
