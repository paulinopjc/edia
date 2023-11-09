import { Model } from 'mongoose';
import mongodb from 'mongodb';
import { User } from '@typedefs/user';

export class Database {
  constructor(private readonly model: Model<User>) {}
  /* Transactional Methods  */
  private async startSession() {
    if (!this.model) throw new Error('Missing Model');
    const session = await this.model.startSession();
    this.startTransaction(session);
    return session;
  }

  private async rollbackSession(session: mongodb.ClientSession) {
    await session.abortTransaction();
    return session.endSession();
  }

  private startTransaction(session: mongodb.ClientSession) {
    return session.startTransaction();
  }

  private transactionCommit(session: mongodb.ClientSession) {
    return session.commitTransaction();
  }

  /* CRUD Methods */
  async getAll(query: any, limit: number, page: number) {
    const data = await this.model
      .aggregate(query)
      .limit(limit ?? 10)
      .skip(page ?? 0);
    const count = await this.model.estimatedDocumentCount();
    return { data, documentCount: count };
  }

  async getOne(query: any) {
    return await this.model.findOne(query);
  }

  async getCount() {
    return await this.model.countDocuments();
  }

  async updateOne(query: any, body: Partial<User>) {
    const session = await this.startSession();
    try {
      const data = this.model.updateOne(query, body, {
        upsert: true,
        session: session
      });
      this.transactionCommit(session);
      return data;
    } catch (e) {
      console.log('Error 47: ', e);
      return await this.rollbackSession(session);
    }
  }

  /* 
  Special Case (Explanation for updateMany methods): 
    return {
      updateOne: { // name of operation
        filter: {
          [field here]: field to be matched
        },
        update: body or changes to be made,
        upsert: true, create if the record doesn't exist
      },
    };
  */

  async updateMany(operations: any[]) {
    console.log('operation ', operations);
    const session = await this.startSession();
    try {
      const data = this.model.bulkWrite(operations);
      this.transactionCommit(session);
      return data;
    } catch (e) {
      console.log('Error 75: ', e);
      return await this.rollbackSession(session);
    }
  }

  // delete shouldn't happen in here as this is a government records. The term we need to use here is to "Rollback" / Rollback Previous Transaction

  async rollbackDocument(query: any) {
    const session = await this.startSession();
    this.startTransaction(session);
    try {
      return this.model.deleteOne(query, {
        session
      });
    } catch (e) {
      console.log('Error 120: ', e);
      return await this.rollbackSession(session);
    }
  }
}
