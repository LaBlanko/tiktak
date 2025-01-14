pipeline {
    agent { 
        node {
            label 'master'
            }
      }
    stages {
        stage('Build') {
            steps {
                echo "Building.."
                sh '''
                echo "Ola"
                '''
            }
        }
        stage('Test') {
            steps {
                echo "Testing.."
                sh '''
		echo "Bonjur"
                '''
            }
        }
        stage('Deliver') {
            steps {
                echo 'Deliver....'
                sh '''
                echo "doing delivery stuff..."
                '''
            }
        }
    }
}