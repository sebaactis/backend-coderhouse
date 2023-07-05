import mongoose from "mongoose";

class MongooseAdapter {

    async init(uri) {
        this.connection = await mongoose.connect(uri);
    }

    async close() {
        await this.connection.disconnect();
    }

    async drop() {
        await this.connection.dropDatabase();
    }
}

export default MongooseAdapter;