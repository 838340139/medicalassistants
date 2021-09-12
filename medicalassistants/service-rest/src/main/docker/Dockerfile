# Docker image for springboot file run
# VERSION 1.0.0
# Author: sasuke
# 基础镜像使用java,第一次启动会下载jdk8
# x86
#FROM java:8
# arm64
# FROM arm64v8/openjdk #有问题
FROM resin/aarch64-alpine-openjdk #可以使用
# 作者
MAINTAINER sasuke <sasuke_xie@163.com>
# 端口
#EXPOSE 8080
# VOLUME 指定了临时文件目录为/tmp。
# 其效果是在主机 /var/lib/docker 目录下创建了一个临时文件，并链接到容器的/tmp
VOLUME /tmp
# 将jar包添加到容器中并更名为app.jar
ADD service-rest-1.0-SNAPSHOT.jar app.jar
# 运行jar包
#RUN bash -c 'touch /app.jar'
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar","--mpw.key=dev95fe8b0ee4da6","--spring.profiles.active=sit"]

#构建镜像
#docker build -t medicalassistants-rest .
#运行容器
#docker run -d --name medicalassistants-rest -p 8080:7001 medicalassistants-rest