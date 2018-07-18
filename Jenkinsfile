pipeline {
  agent {
    docker {
      image 'node:8-alpine'
    }
  }

  environment {
    PATH = '~/.local/bin:${PATH}'
  }

  stages {
    stage('Prepare') {
      steps {
        sh 'id'
        // sh 'apk add --update python py-pip'
      }
    }
    stage('Prepare - pre-production') {
      when {
        changeRequest target: 'production'
      }
      steps {
        sh 'pip install awscli --upgrade --user'
      }
    }
    stage('Prepare - production') {
      when {
        branch 'production'
      }
      steps {
        sh 'npm install -g gh-pages'
      }
    }
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }
    stage('Deploy - pre-production') {
      when {
        changeRequest target: 'production'
      }
      steps {
        sh 'aws s3 sync --delete --acl public-read public s3://centreon-labs/${BRANCH_NAME}'
      }
    }
    stage('Deploy - production') {
      when {
        branch 'production'
      }
      steps {
        sh 'echo MEP'
      }
    }
  }
}
