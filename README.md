# Rabbit Watchdog

The Rabbit Watchdog is a [RabbitMQ Monitor](https://rabbitmq.com/).

The application read all queues on your Rabbitmq instalattion and get all queues with **messages > 0** and **queue is idle more 10 minutes**.

![rabbit](./img/RabbitMQWatchdog.png)

## build

`docker build --pull --rm -f "Dockerfile" -t pedrorobsonleao/rabbitwatchdog:latest "." <`

## run

```powershell
docker run --rm `
   pedrorobsonleao/rabbitwatchdog `
   --rabbit.url http://yourabbitmq.url.com:15672 `
   --rabbit.username username  `
   --rabbit.password password `
   --rabbit.filter.vhost '.+' `
   --rabbit.filter.queue '.+' `
   --slack.url https://hooks.slack.com/services/zzzzz/XXXXXXXXXX/yyyyyyyy `
   --slack.channel sandbox `
   --slack.emoji :rabbitmq:
 ```

 ```poweshell
 docker run --rm  `
   -e rabbit__url='http://yourabbitmq.url.com:15672' `
   -e rabbit__username='usename'  `
   -e rabbit__password='password' `
   -e rabbit__filter__vhost='.+' `
   -e rabbit__filter__queue='.+' `
   -e slack__url='https://hooks.slack.com/services/zzzzz/XXXXXXXXXX/yyyyyyyy' `
   -e slack__channel='sandbox' `
   -e slack__emoji=':rabbitmq:' `
   pedrorobsonleao/rabbitwatchdog
 ```
 