import { ref, set } from 'firebase/database';
import { database } from 'services/firebase';

export const createAffirmationItem = async (content: string) => {
  const id = crypto.randomUUID();
  await set(ref(database, 'affirmation/' + id), {
    id,
    content,
    createdAt: new Date().toISOString(),
  });
};
