import { exit } from 'shelljs'
import { program } from 'commander'
import dotenv from 'dotenv'
dotenv.config();

import mongoose from 'mongoose';
import AddUser from './presentation/commands/AddUser.js';

void (async () => {

    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        program.addCommand(AddUser);

        await program.parseAsync(process.argv);

        exit();
    }

    catch (error) {
        console.log(error);
        exit();
    }

})();