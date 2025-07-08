pipeline {
    agent any

    environment {
        PEM_FILE = "/var/lib/jenkins/.ssh/weatherapp.pem"
        REMOTE_USER = "ubuntu"
        REMOTE_HOST = "100.27.130.81"
    }

    stages {
        stage('Debug') {
            steps {
                sh 'pwd && ls -l'
            }
        }

        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/ubeaws/weather-app-devops-demo.git'
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
                scp -o StrictHostKeyChecking=no -i $PEM_FILE weather-app.tar $REMOTE_USER@$REMOTE_HOST:/home/ubuntu/
                '''
            }
        }

        stage('Deploy on EC2') {
            steps {
                sh '''
                ssh -o StrictHostKeyChecking=no -i $PEM_FILE $REMOTE_USER@$REMOTE_HOST << 'EOF'
                    docker load < /home/ubuntu/weather-app.tar
                    docker stop weather-app || true
                    docker rm weather-app || true
                    docker run -d --name weather-app -p 80:3000 weather-app
EOF
                '''
            }
        }
    }
}

