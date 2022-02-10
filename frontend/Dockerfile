FROM node:16.13.1

# root 에 app 폴더를 생성
RUN mkdir /app

# work dir 고정
WORKDIR /app

# work dir 에 build 폴더 생성 /app/build
RUN mkdir ./build

# host pc의 현재경로의 build 폴더를 workdir 의 build 폴더로 복사
ADD ./build ./build

EXPOSE 80

# container 실행 시 자동으로 실행할 command. nginx 시작함
CMD ["serve", "-s", "build"]
