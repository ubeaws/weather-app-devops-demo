pipeline {
    agent any

    environment {
        REMOTE_USER = 'ubuntu'
        REMOTE_HOST = '100.27.130.81'
        REMOTE_KEY = credentials('EC2_PRIVATE_KEY')  // Store your PEM key in Jenkins Credentials
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/your-username/weather-app-devops-demo.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t weather-app .'
            }
        }

        stage('Save Docker Image') {
            steps {
                sh 'docker save weather-app > weather-app.tar'
            }
        }

        stage('Copy to EC2') {
            steps {
                sh '''
                scp -o StrictHostKeyChecking=no -i $REMOTE_KEY weather-app.tar $REMOTE_USER@$REMOTE_HOST:/home/ec2-user/
                '''
            }
        }

        stage('Deploy on EC2') {
            steps {
                sh '''
                ssh -o StrictHostKeyChecking=no -i $REMOTE_KEY $REMOTE_USER@$REMOTE_HOST << EOF
                    docker load < weather-app.tar
                    docker stop weather-app || true
                    docker rm weather-app || true
                    docker run -d --name weather-app -p 80:3000 weather-app
                EOF
                '''
            }
        }
    }
}

