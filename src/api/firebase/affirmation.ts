import { child, get, ref, remove, runTransaction, set } from 'firebase/database';
import { database, dbRef } from 'services/firebase';
import { AffirmationItemType } from 'types/affirmation';

export type ApiResult<T> = { success: true; data: T } | { success: false; error: string };

export const handleApiError = async <T>(
  apiFunc: () => Promise<T>,
  errorMessage = 'API 호출 중 문제가 발생했습니다.',
): Promise<ApiResult<T>> => {
  try {
    const data = await apiFunc();
    return { success: true, data };
  } catch (error) {
    console.error(errorMessage, error);
    return { success: false, error: errorMessage };
  }
};

export const getAffirmationList = async (authedUserId: string): Promise<ApiResult<AffirmationItemType[]>> => {
  return handleApiError(async () => {
    const res = await get(child(dbRef, `${authedUserId}/affirmation`));
    if (res.exists()) {
      const arr = Object.values(res.val()) as AffirmationItemType[];
      return arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else return [];
  }, '확언 목록을 가져오는 데 실패했습니다.');
};

export const getAffirmationItem = async (params: {
  authedUserId: string;
  affirmationId: string;
}): Promise<ApiResult<AffirmationItemType>> => {
  const { authedUserId, affirmationId } = params;
  return handleApiError(async () => {
    const res = await get(child(dbRef, `${authedUserId}/affirmation/${affirmationId}`));
    if (res.exists()) {
      return res.val();
    }
    throw new Error('확언 정보 데이터가 없습니다.');
  }, '확언 정보를 가져오는 데 실패했습니다.');
};

export const createAffirmationItem = async (params: {
  content: string;
  authedUserId: string;
}): Promise<ApiResult<void>> => {
  const { content, authedUserId } = params;
  const id = crypto.randomUUID();
  return handleApiError(async () => {
    try {
      await set(ref(database, `${authedUserId}/affirmation/` + id), {
        id,
        content,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      throw new Error('확언 생성에 실패했습니다.');
    }
  }, '확언 생성에 실패했습니다.');
};

export const updateAffirmationItem = async (params: {
  id: string;
  content: string;
  authedUserId: string;
}): Promise<ApiResult<void>> => {
  const { id, content, authedUserId } = params;
  const updateRef = ref(database, `${authedUserId}/affirmation/${id}`);
  return handleApiError(async () => {
    try {
      await runTransaction(updateRef, (item) => {
        return {
          id,
          content,
          createdAt: new Date().toISOString(),
        };
      });
    } catch (error) {
      throw new Error('확언 수정에 실패했습니다.');
    }
  }, '확언 수정에 실패했습니다.');
};

export const deleteAffirmationItem = async (params: { id: string; authedUserId: string }) => {
  const { id, authedUserId } = params;
  return handleApiError(async () => {
    try {
      await remove(ref(database, `${authedUserId}/affirmation/${id}`));
    } catch (error) {
      throw new Error('확언 삭제에 실패했습니다.');
    }
  }, '확언 삭제에 실패했습니다.');
};
