pipeline {

    agent any

    environment {
        IMAGE_NAME = "YOUR_DOCKERHUB_USERNAME/nodejs-cicd"
        CONTAINER_NAME = "nodejs-app"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'YOUR_GITHUB_REPOSITORY_URL'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${IMAGE_NAME}:latest .'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    '''
                }
            }
        }

        stage('Push Image') {
            steps {
                sh 'docker push ${IMAGE_NAME}:latest'
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                docker stop ${CONTAINER_NAME} || true
                docker rm ${CONTAINER_NAME} || true

                docker pull ${IMAGE_NAME}:latest

                docker run -d \
                --name ${CONTAINER_NAME} \
                -p 3000:3000 \
                ${IMAGE_NAME}:latest
                '''
            }
        }
    }
}
