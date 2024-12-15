import { child, get, ref, set } from 'firebase/database';
import { database, dbRef } from 'services/firebase';
import { AffirmationItemType } from 'types/affirmation';

export const createAffirmationItem = async (content: string) => {
  const id = crypto.randomUUID();
  await set(ref(database, 'affirmation/' + id), {
    id,
    content,
    createdAt: new Date().toISOString(),
  });
};

export const getAffirmationList = async (): Promise<AffirmationItemType[] | null> => {
  try {
    const res = await get(child(dbRef, 'affirmation/'));
    if (res.exists()) {
      const arr = Object.values(res.val()) as AffirmationItemType[];
      return arr.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else {
      console.log('No data available');
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};
