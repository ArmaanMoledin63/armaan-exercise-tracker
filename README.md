# AWS NodeJS MongoDB Deployment

A step-by-step guide for deploying a Node.js application with MongoDB on AWS EC2, complete with domain setup and SSL configuration.

## Quick Start

```bash
# Clone this repository
git clone https://github.com/yourusername/your-repo-name.git

# Navigate to the project directory
cd your-repo-name

# Copy the deployment scripts
cp scripts/* /your/deployment/location
```

## Prerequisites

- AWS Account with appropriate permissions
- Registered domain name (for production deployment)
- Node.js application ready for deployment
- Basic understanding of:
  - Linux commands
  - SSH
  - AWS Services (EC2, Route 53)

## Deployment Steps

### 1. Launch EC2 Instance

```bash
# Connect to your instance
ssh -i "your-key.pem" ec2-user@your-ec2-instance
```

Key configurations:
- AMI: Amazon Linux or Ubuntu
- Instance Type: Based on requirements (t2.micro for testing)
- Security Groups: SSH (22), HTTP (80), HTTPS (443)

### 2. Install MongoDB

```bash
sudo apt update
sudo apt install mongodb
sudo service mongodb start
```

### 3. Setup Node.js

```bash
sudo apt install nodejs npm
npm install pm2 -g
```

### 4. Configure DNS with Route 53

Domain setup steps available in AWS console:
1. Create hosted zone
2. Update nameservers
3. Create A record

## Security

Essential security configurations included:
- EC2 security groups
- MongoDB authentication
- SSL/TLS setup (optional)
- Domain configuration

## AWS Services Used

| Service | Purpose | Type |
|---------|----------|------|
| EC2 | Virtual Server | IaaS |
| Route 53 | DNS Management | PaaS |
| ACM | SSL Certificates | PaaS |

## Project Structure

```
.
├── scripts/
│   ├── deploy.sh
│   ├── setup-mongodb.sh
│   └── setup-nodejs.sh
├── docs/
│   └── detailed-guide.md
└── README.md
```

## Common Issues

1. **Connection Timeout**
   - Check security group rules
   - Verify instance is running

2. **MongoDB Connection Failed**
   ```bash
   sudo systemctl status mongodb
   ```

3. **Domain Not Resolving**
   - Allow 48 hours for DNS propagation
   - Verify Route 53 settings



## Acknowledgments

- AWS Documentation
- MongoDB Documentation
- Node.js Community

---
Made by Armaan Moledina

Project for Cloud Computing Course: Semester 5 Computer Engineering
