pipeline {
    agent { 
        node {
            label 'master'
            }
      }
    triggers {
        pollSCM '* * * * *'
    }
    stages {
        stage('Build') {
            steps {
                echo "Building.."
                sh '''
                npm i
		npm run build
                '''
            }
        }
        stage('Test') {
            steps {
                echo "Testing.."
                sh '''
		echo "Test Test"
                '''
            }
        }
        stage('Deliver') {
            steps {
                echo 'Deliver....'
                sh '''
                echo "doing delivery stuff.."
                '''
            }
        }
    }
}