import mongoose from "mongoose";

class MongooseAdapter {
    
    async init(uri) {

        this.connection = await mongoose.connect(uri);

    }

    async close() {
        await this.connection.disconnect();
    }
}

export default MongooseAdapter;