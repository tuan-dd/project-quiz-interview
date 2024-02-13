aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 165738883148.dkr.ecr.ap-southeast-1.amazonaws.com
docker build --platform linux/amd64 -t 165738883148.dkr.ecr.ap-southeast-1.amazonaws.com/interview:0.0.1 .
docker push 165738883148.dkr.ecr.ap-southeast-1.amazonaws.com/interview:0.0.1
