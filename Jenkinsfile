pipeline {
  agent {
    docker {
      image 'node:8'
      args '-u root:node'
    }
  }

  environment {
    PATH = '~/.local/bin:${PATH}'
  }

  stages {
    stage('Prepare - pre-production') {
      when {
        changeRequest target: 'production'
      }
      steps {
        sh 'apt-get update'
        sh 'apt-get install -y awscli'
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
      }
    }
    stage('Build - preproduction') {
      when {
        changeRequest target: 'production'
      }
      steps {
        sh 'npm run build'
      }
    }
    stage('Build - production') {
      when {
        branch 'production'
      }
      steps {
        sh 'npm run build'
      }
    }
    stage('Deploy - pre-production') {
      when {
        changeRequest target: 'production'
      }
      steps {
        sh 'aws s3 sync --delete --acl public-read public s3://centreon-labs/'
      }
    }
    stage('Deploy - production') {
      when {
        branch 'production'
      }
      steps {
        sh 'gh-pages -d public'
      }
    }
  }
}
