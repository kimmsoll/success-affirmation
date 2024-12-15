import { child, get, ref, remove, runTransaction, set } from 'firebase/database';
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

export const getAffirmationItem = async (id: string): Promise<AffirmationItemType | null> => {
  try {
    const res = await get(child(dbRef, `affirmation/${id}`));
    if (res.exists()) {
      return res.val();
    } else {
      console.log('No data available');
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const updateAffirmationItem = async (id: string, newContent: string) => {
  const updateRef = ref(database, `affirmation/${id}`);
  try {
    const res = runTransaction(updateRef, (item) => {
      return {
        id,
        content: newContent,
        createdAt: new Date().toISOString(),
      };
    });
  } catch (e) {
    console.error(e);
  }
};

export const deleteAffirmationItem = async (id: string) => {
  try {
    await remove(ref(database, `affirmation/${id}`));
  } catch (error) {
    console.error('삭제 실패:', error);
    throw new Error('데이터 삭제에 실패했습니다.');
  }
};
