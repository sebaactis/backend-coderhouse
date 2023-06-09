import { Command } from 'commander'
import UserManager from '../../domain/managers/UserManager.js';

const addUserCommand = new Command('addUser');

addUserCommand
    .version('0.0.1')
    .description('Add User')
    .option('-e, --email <email>', 'User`s email')
    .option('-fn, --firstName <firstName>', 'User`s first name')
    .option('-ln, --lastName <lastName>', 'User`s last name')
    .option('-p, --password <password>', 'User`s password')
    .option('-a, --age <age>', 'User`s age')
    .action(async (env) => {

        const payload = {
            ...env,
            age: +env.age
        };

        console.log(env)
        console.log(payload)

        const manager = new UserManager();
        const user = await manager.addUser(payload);

        if (user) {
            console.log('User created');
        }
    });

export default addUserCommand;
