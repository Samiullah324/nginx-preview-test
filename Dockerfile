FROM node:22-alpine AS backend
WORKDIR /app/backend
COPY backend/package.json ./
COPY backend/*.js ./
RUN npm install --omit=dev

FROM nginx:1.27-alpine
RUN apk add --no-cache nodejs
RUN mkdir -p /usr/share/nginx/html/js /usr/share/nginx/html/css
COPY css/landing.css /usr/share/nginx/html/css/landing.css
COPY --from=backend /app/backend /app/backend
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY login.html /usr/share/nginx/html/login.html
COPY signup.html /usr/share/nginx/html/signup.html
COPY css/auth.css /usr/share/nginx/html/css/auth.css
COPY js/auth-api.js /usr/share/nginx/html/js/auth-api.js
COPY js/landing-data.js /usr/share/nginx/html/js/landing-data.js
COPY js/landing.js /usr/share/nginx/html/js/landing.js
COPY js/theme.js /usr/share/nginx/html/js/theme.js
COPY health.txt /usr/share/nginx/html/health
COPY start.sh /start.sh
RUN chmod +x /start.sh
EXPOSE 80
CMD ["/start.sh"]
