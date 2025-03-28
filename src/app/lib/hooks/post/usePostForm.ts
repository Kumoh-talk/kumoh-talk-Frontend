import { useContext } from 'react';
import { PostContext } from '@/app/components/recruitment-boards/post/PostProvider';
import { PostBoard } from '../../types/recruitmentBoards/post/postBoard';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { PostForm } from '../../types/recruitmentBoards/post/postForm';
import {
  patchRecruitmentBoard,
  postRecruitmentBoard,
} from '../../apis/recruitment-boards/recruitmentBoard';

function validateQuestionForm(
  form: PostForm[],
  setQuestionError: (state: string) => void
) {
  const hasError = form.some(({ question, type, answerList }) => {
    if (question === '') {
      setQuestionError('모든 질문 제목을 입력해주세요');
      return true;
    }

    if (answerList.length === 0 && type !== 'description') {
      setQuestionError(
        '객관형 혹은 체크박스 질문은 1개 이상의 답변을 추가해주세요'
      );
      return true;
    }

    return false;
  });

  if (!hasError) {
    setQuestionError('');
  }

  return !hasError;
}

export default function usePostForm({
  boardId,
  defaultValues,
  resolver,
}: {
  boardId?: string;
  defaultValues: PostBoard;
  resolver: any;
}) {
  const router = useRouter();
  const { form, questionError, setQuestionError } = useContext(PostContext);
  const formState = useForm({ defaultValues, resolver });

  const onSubmit = async (data: PostBoard) => {
    if (!validateQuestionForm(form, setQuestionError)) {
      console.log('폼 검증 에러');
      return;
    }

    const formData = {
      board: data,
      form,
    };
    formData.board.recruitmentDeadline = new Date(
      formData.board.recruitmentDeadline
    ).toISOString();
    formData.board.activityStart = new Date(
      formData.board.activityStart
    ).toISOString();
    formData.board.activityFinish = new Date(
      formData.board.activityFinish
    ).toISOString();

    if (boardId) {
      const response = await patchRecruitmentBoard(
        boardId,
        'published',
        formData
      );

      if (response.success === 'true') {
        router.replace('/recruitment-boards');
      }
      return;
    }

    const response = await postRecruitmentBoard(formData, 'published');

    if (response.success === 'true') {
      router.replace('/recruitment-boards');
    }
  };
  const onError = (error: unknown) => console.log(error);

  return { form, formState, onSubmit, onError, questionError };
}
