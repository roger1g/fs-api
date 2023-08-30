1. HTTPS -> Main CYCLIC has CI/CD pipe lines. Any changes on main will be deployed.
2. HTTP -> AWS running version of this work.
3. Never merge AWS-main and main. It does not make any sense essentially.
4. Follow the flow

   dev     ---------------> main

   aws-dev ---------------> aws-main.

   Don't mix the flow.



# Flow
##### Client send data to Cyclic server 
 - in Main branch

##### Main branch Cyclic server send data to AWS server
 - use axios rest to call aws api
 - AWS-Main branch

##### After works, AWS server return data to Cyclic server

##### Cyclic server return data (from AWS server) to Client

# Deploy
### AWS
- before upload file, need ```tsc``` to build and move dist folder too.
- Check env
- ![image](https://github.com/roger1g/fs-api/assets/59503331/aea99a21-5db5-468b-97f1-e9f9bbbee336)

# Forever Start
- in the server folder
- ```forever start -c "npm start" ./```
