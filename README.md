Deployment (AWS with Terraform & Kubernetes)
Step 1: Create Dockerfiles

Backend Dockerfile:
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start"]

Step 2: Deploy with Terraform

EKS Cluster Setup (main.tf)
provider "aws" {
  region = "us-east-1"
}
resource "aws_eks_cluster" "eks_cluster" {
  name     = "blog-api-cluster"
  role_arn = aws_iam_role.eks_role.arn
}

Step 3: Deploy with Kubernetes

Deployment YAML (backend-deployment.yaml)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: backend
        image: myrepo/backend:latest
        ports:
        - containerPort: 3000

Service YAML (backend-service.yaml)

apiVersion: v1
kind: Service
metadata:
  name: backend
spec:
  selector:
    app: backend
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer
