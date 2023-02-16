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
    --rabbit.url      'http://yourabbitmq.url.com:15672' `
    --rabbit.username 'username' `
    --rabbit.password 'password' `
    --slack.url       'https://hooks.slack.com/services/zzzzz/XXXXXXXXXX/yyyyyyyy' `
    --slack.channel   'sandbox'
 ```

 ```powershell
 docker run --rm `
    -e RABBIT_URL='http://yourabbitmq.url.com:15672' `
    -e RABBIT_USER='username' `
    -e RABBIT_PWD='password' `
    -e SLACK_URL='https://hooks.slack.com/services/zzzzz/XXXXXXXXXX/yyyyyyyy' `
    -e SLACK_CHANNEL='sandbox' `
    pedrorobsonleao/rabbitwatchdog
 ```
