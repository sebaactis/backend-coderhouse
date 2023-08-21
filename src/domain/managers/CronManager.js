import cron from 'node-cron'
import UserManager from './UserManager.js';

const manager = new UserManager();

class CronManager {

    async deleteUsersByLastLogin() {
        cron.schedule('0 0 */2 * *', () => {
            manager.deleteUserByDate();
        });
    }

}

export default CronManager;

