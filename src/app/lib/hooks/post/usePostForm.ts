import { useContext } from 'react';
import { TabsContext } from '@/app/components/recruitment-boards/post/TabsProvider';
import { PostContext } from '@/app/components/recruitment-boards/post/PostProvider';
import { PostBoard } from '../../types/recruitmentBoards/post/postBoard';
import { useForm } from 'react-hook-form';

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

export default function usePostForm() {
  const { state } = useContext(TabsContext);
  const { form } = useContext(PostContext);
  const formState = useForm({ defaultValues });

  const onSubmit = (data: PostBoard) => {
    const formData = {
      board: {
        ...state,
        ...data,
      },
      form,
    };
    console.log(formData);
  };
  const onError = (error: unknown) => console.log(error);

  return { state, form, formState, onSubmit, onError };
}
