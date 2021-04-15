import faunadb from 'faunadb';

export const guestClient = new faunadb.Client({
  secret: process.env.NEXT_PUBLIC_FAUNA_GUEST_SECRET,
});

export const authClient = (secret) =>
  new faunadb.Client({
    secret,
  });
