For windows 
https://docs.mongodb.com/manual/reference/program/mongo/#mongodb-binary-bin.mongo

### Enable Access Control¶

mongo --host mongodb0.example.com --port 27017 [additional options]


#### Overview

Enabling access control on a MongoDB deployment enforces authentication, requiring users to identify themselves. When accessing a MongoDB deployment that has access control enabled, users can only perform actions as determined by their roles.

#### User Administrator¶

With access control enabled, ensure you have a user with userAdmin or `userAdminAnyDatabase` role in the `admin` database. This user can administrate user and roles such as: **create users, grant** or **revoke roles** from users, and **create** or **modify** customs roles

#### Procedure

The following procedure first adds a user administrator to a MongoDB instance running without access control and then enables access control.



#### 1. Connect to the instance.

For example, open a new terminal and connect a mongo shell to the instance:

```sh
 - mongo --port 27017 
 - mongo --host mongodb0.example.com:27017 [additional options]

```
 [additional options](https://docs.mongodb.com/manual/reference/program/mongo#mongodb-binary-bin.mongo)

#### 2. Create the user administrator.


From the mongo shell, add a user with the ``userAdminAnyDatabase`` role in the `admin` database.

Include additional roles as needed for this user. For example, the following creates the user `myUserAdmin` in the admin database with the `userAdminAnyDatabase` role and the `readWriteAnyDatabase` role.


```shell
use admin
db.createUser(
  {
    user: "myUserAdmin",
    pwd: passwordPrompt(), // or cleartext password
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)
```
**Tips**

Starting in version 4.2 of the mongo shell, you can use the [passwordPrompt()](https://docs.mongodb.com/manual/reference/method/passwordPrompt/#mongodb-method-passwordPrompt) method in conjunction with various user authentication/management methods/commands to prompt for the password instead of specifying the password directly in the method/command call. However, you can still specify the password directly as you would with earlier versions of the mongo shell.


#### 3. Enable authentication from conf file

sudo vim /etc/mongod.conf

**add these lines**

```shell
security:
    authorization: enabled
```


#### 4. Restart mongodb & check it.

```shell
sudo systemctl restart mongod.service

mongo --port 27017  --authenticationDatabase "admin" -u "myUserAdmin" -p
```