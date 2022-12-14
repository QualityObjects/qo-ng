def gitCredentialsId = 'GitLab-qualityobjects'
def dockerCredentialsId = 'docker-registry.qodev.es'
def npmrcCredentialsId = '.npmrc'

def createBuildInfoFile(targetDir) {
    sh "[ -d ${targetDir} ] &&  echo ${targetDir} already exists || mkdir -p ${targetDir}"
    sh "git log --no-decorate --date=iso | head -4 > ${targetDir}/build_info.txt"
}

pipeline {
    agent any
    environment {
        NEXUS_IP = sh(script: "getent hosts nexus.qodev.es | cut -f1 -d ' ' ", returnStdout: true).trim()
    }
    parameters {
        string(name: 'BRANCH', defaultValue: 'dev', description: 'Rama a construir')
        choice(name: 'LIB_NAME', choices: ['common-ui', 'the-table'], description: 'Opciones: common-ui, the-table')
        booleanParam(name: 'PUBLISH', defaultValue: true, description: 'Publica el artefacto en el repositorio Nexus')
        booleanParam(name: 'MAKE_RELEASE', defaultValue: false, description: 'Se crea una release desde master')
    }
    stages {
        stage('Clone repo') {
            steps {
                script {
                    try {
                        sh 'mkdir ${LIB_NAME}'
                    } catch (err) {
                        dir("${LIB_NAME}") {
                            sh 'ls -1A | grep -v .npm | grep -v node_modules | xargs rm -rf || echo Empty dir'
                            sh '[ -d node_modules ] && mv node_modules ../.cache/ || echo No node_modules dir'
                            sh '[ -d .npm ] && mv .npm ../.cache/ || echo No .mpn dir'                            
                        }
                    }
                }

                dir("${LIB_NAME}") {
                    git url: 'git@gitlab.com:qointernal/qo-libs/qo-ng.git',
                            branch: '${BRANCH}',
                            credentialsId: gitCredentialsId

                    createBuildInfoFile('projects/${LIB_NAME}/src/assets')
                }
                script {
                    dir('.cache') {
                        sh '[ -d node_modules ] && mv node_modules ../${LIB_NAME}/ || echo No node_modules cached'
                        sh '[ -d .npm ] && mv .npm ../${LIB_NAME}/ || echo No .npm cached'
                    }
                }
            }
        }
        stage('Build lib') {
            environment {
                HOME = "."
                APP_VERSION = sh(script: 'node -p "require(\\"./${LIB_NAME}/package.json\\").version"', returnStdout: true).trim()
            }
/*            agent {
                docker {
                    image 'node:14-slim'
                    args '--add-host nexus.qodev.es:${NEXUS_IP}'
                    reuseNode true
                }
            }*/
            steps {
                dir("${LIB_NAME}") {
                    withCredentials([file(credentialsId: npmrcCredentialsId, variable: 'NPMRC')]) {
                        sh 'cp "$NPMRC" ./.npmrc'
                    }
                    sh 'echo "Version: ${APP_VERSION}" >> projects/${LIB_NAME}/src/assets/build_info.txt'
                    sh 'cat projects/${LIB_NAME}/src/assets/build_info.txt'
                    sh 'echo n | npm i --no-color'
                    sh 'npx ng build ${LIB_NAME}'
                }
            }
        }
        stage('Publish lib') {
            when {
                environment name: 'PUBLISH', value: 'true'
            }
            steps {
                dir("${LIB_NAME}/dist/${LIB_NAME}") {
                    script {
                        if (env.MAKE_RELEASE != 'true') {
                            sh 'npm version ${APP_VERSION}-{BRANCH}'
                            sh 'echo "Version=${APP_VERSION}-${BRANCH}"'
                        }
                        withCredentials([file(credentialsId: npmrcCredentialsId, variable: 'NPMRC')]) {
                            sh 'cp "$NPMRC" ./.npmrc'
                        }
                        sh 'npm publish'
                    }
                }
            }
        }
    }
    post {
        // Clean after build
        always {
            script {
                sh('docker image prune -f')
            }
            cleanWs(cleanWhenNotBuilt: false,
                deleteDirs: true,
                disableDeferredWipeout: true,
                notFailBuild: true,
                patterns: [[pattern: '.gitignore', type: 'INCLUDE'],
                            [pattern: '.propsfile', type: 'EXCLUDE']])
        }
        
        // Send mail if job fails or if successful after last failure
        failure {
            emailext body: '$DEFAULT_CONTENT',
            recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
            subject: '$DEFAULT_SUBJECT'
        }
        
        fixed {
            emailext body: '$DEFAULT_CONTENT',
            recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
            subject: '$DEFAULT_SUBJECT'
        }
    }
}
