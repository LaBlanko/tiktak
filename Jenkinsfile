pipeline {
    agent { 
        node {
            label 'master'
            }
      }
    stages {
	stage('Abhaengigkeiten'){
	    steps {
		sh '''
		sudo apt update && sudo apt install nodejs npm
		'''
	    }
	}
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