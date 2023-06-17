pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'ss871104'
        PATH = "${env.PATH}:/usr/local/bin"
    }

    stages {
        stage('Initialize') {
            steps {
                sh 'echo "Starting pipeline..."'
            }
        }

        stage('Build Docker Images') {
            stage('Build frontend-service image') {
                    steps {
                        sh "docker build -t $DOCKER_REGISTRY/split-bill-react-frontend-service ."
                    }
                }
        }

        stage('Deploy My Services to Kubernetes') {
            steps {
                dir('k8s') {
                    sh 'kubectl apply -f .'
                }
            }
        }

        stage('Cleanup') {
            steps {
                sh '''
                  docker rmi $(docker images -f "dangling=true" -q) --force
                '''
            }
        }

    }
}
