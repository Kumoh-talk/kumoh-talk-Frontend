import { useContext } from 'react';
import { TabsContext } from '@/app/components/recruitment-boards/post/TabsProvider';
import { PostContext } from '@/app/components/recruitment-boards/post/PostProvider';
import { PostBoard } from '../../types/recruitmentBoards/post/postBoard';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { PostForm } from '../../types/recruitmentBoards/post/postForm';

const defaultValues: PostBoard = {
  title: '',
  summary: '',
  host: '',
  content: '',
  recruitmentTarget: '',
  recruitmentNum: 0,
  currentMemberNum: 0,
  recruitmentDeadline: '',
  activityStart: '',
  activityFinish: '',
  activityCycle: '',
};

function validateQuestionForm(
  form: PostForm[],
  setQuestionError: (state: string) => void
) {
  // 질문의 갯수가 0개일 때 에러 메시지 출력
  if (form.length === 0) {
    setQuestionError('1개 이상의 질문을 추가해주세요');
    return false;
  }

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

export default function usePostForm({ resolver }: { resolver: any }) {
  const router = useRouter();
  const { state } = useContext(TabsContext);
  const { form, questionError, setQuestionError } = useContext(PostContext);
  const formState = useForm({ defaultValues, resolver });

  const onSubmit = async (data: PostBoard) => {
    if (!validateQuestionForm(form, setQuestionError)) {
      return;
    }

    const formData = {
      board: {
        ...state,
        ...data,
      },
      form,
    };
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${baseUrl}/api/v1/recruitment-boards?status=published`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          console.log('submit success');
          console.log(formData);
          router.back();
        } else {
          console.log('submit fail');
        }
      })
      .catch((error) => console.log(error));
  };
  const onError = (error: unknown) => console.log(error);

  return { state, form, formState, onSubmit, onError, questionError };
}
