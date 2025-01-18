import { useContext } from 'react';
import { TabsContext } from '@/app/components/recruitment-boards/post/TabsProvider';
import { PostContext } from '@/app/components/recruitment-boards/post/PostProvider';
import { PostBoard } from '../../types/recruitmentBoards/post/postBoard';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

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

export default function usePostForm({ resolver }: { resolver: any }) {
  const router = useRouter();
  const { state } = useContext(TabsContext);
  const { form } = useContext(PostContext);
  const formState = useForm({ defaultValues, resolver });

  const onSubmit = async (data: PostBoard) => {
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

  return { state, form, formState, onSubmit, onError };
}
