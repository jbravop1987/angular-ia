FROM nginx:alpine

# Limpiar config default
RUN rm /etc/nginx/conf.d/default.conf

# Copiar tu config nginx
COPY nginx/conf/default.conf /etc/nginx/conf.d/

# Copiar build de Angular
COPY dist/angular-ia-v3/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]