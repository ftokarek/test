import { Inngest } from 'inngest';
import User from '../models/User';
import Order from '../models/Order';
import connectDB from './db';
// Create a client to send and receive events
export const inngest = new Inngest({ id: 'neurosphere' });

// Inngest function to save user data to database
export const syncUserCreation = inngest.createFunction(
  { id: 'create-user-from-clerk' },
  { event: 'clerk/user.created' },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      imageUrl: image_url,
    };
    await connectDB();
    await User.create(userData);
  }
);

// Inngest function to update user data in database
export const syncUserUpdate = inngest.createFunction(
  { id: 'update-user-from-clerk' },
  { event: 'clerk/user.updated' },
  async ({ event }) => {
    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;
    await connectDB();
    await User.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          email: email_addresses[0].email_address,
          name: `${first_name} ${last_name}`,
          imageUrl: image_url,
        },
      }
    );
  }
);

// Inngest function to delete user data from database
export const syncUserDeletion = inngest.createFunction(
  { id: 'delete-user-from-clerk' },
  { event: 'clerk/user.deleted' },
  async ({ event }) => {
    const { id } = event.data;
    await connectDB();
    await User.findByIdAndDelete(id);
  }
);

// Inngest function to create order
export const createUserOrder = inngest.createFunction(
  {
    id: 'create-user-order',
    batchEvents: {
      maxSize: 5,
      timeout: '5s',
    },
  },
  { event: 'order/created' },
  async ({ events }) => {
    const orders = events.map((event) => {
      return {
        user: event.data.userId,
        items: event.data.items,
        amount: event.data.amount,
        address: event.data.address,
        date: event.data.date,
      };
    });
    await connectDB();
    await Order.insertMany(orders);

    return {
      success: true,
      processed: orders.length,
    };
  }
);
