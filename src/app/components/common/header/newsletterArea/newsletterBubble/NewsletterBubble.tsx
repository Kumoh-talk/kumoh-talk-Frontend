'use client';

import clsx from 'clsx';
import styles from './newsletterBubble.module.scss';
import BasicBubble from '../../../basicBubble/BasicBubble';
import CloseButton from '../../loginArea/loginButton/loginBubble/CloseButton';
import Button from '../../../button/Button';
import { subscribe } from '@/app/lib/apis/newsletters';
import useInputs from '@/app/lib/hooks/useInput';
import UnionIcon from '@/app/assets/svg/UnionIcon';

export interface Props {
  className: string;
  onClose: () => void;
}

export default function NewsletterBubble({ className, onClose }: Props) {
  const [state, onChange] = useInputs({
    email: '',
    sub_semina_notice: true,
    sub_semina: false,
    sub_new_study: false,
    sub_new_project: false,
  });

  const onSubmit = async () => {
    try {
      const res = await subscribe(
        state.email,
        true,
        state.sub_semina,
        state.sub_new_study,
        state.sub_new_project,
      );

      if (res.status !== 200) {
        console.error('구독 실패');
        const msg = await res.json();
        if (msg?.msg) {
          alert(msg.msg);
        }
        return;
      }

      console.log(await res.json());
      alert('뉴스레터 구독 신청이 완료되었습니다.');
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <BasicBubble
      direction="right-start"
      className={clsx(className, styles.bubble)}
    >
      <CloseButton onClick={onClose} />
      <section className={styles.content}>
        <img
          className={styles.logo}
          src="/images/logo_dark_2x.webp"
          alt="금오톡 로고"
        />
        <input
          type="email"
          name="email"
          placeholder="이메일을 입력하세요."
          onChange={onChange}
          value={state.email}
        />
        <div className={styles.checkboxs}>
          <div className={styles.checkbox}>
            <label className={styles.disabled}>
              세미나 공지사항
              <input
                type="checkbox"
                name="sub_semina_notice"
                value={'on'}
                disabled
              />
              <span className={styles.checkmark}>
                <UnionIcon />
              </span>
            </label>
          </div>
          <div className={styles.checkbox}>
            <label>
              <input
                type="checkbox"
                name="sub_semina"
                onChange={onChange}
                value={state.sub_semina ? 'on' : ''}
              />
              <span className={styles.checkmark}>
                <UnionIcon />
              </span>
              세미나 내용정리 알림
            </label>
          </div>
          <div className={styles.checkbox}>
            <label>
              <input
                type="checkbox"
                name="sub_new_study"
                onChange={onChange}
                value={state.sub_new_study ? 'on' : ''}
              />
              <span className={styles.checkmark}>
                <UnionIcon />
              </span>
              스터디 새 글 알림
            </label>
          </div>
          <div className={styles.checkbox}>
            <label>
              <input
                type="checkbox"
                name="sub_new_project"
                onChange={onChange}
                value={state.sub_new_project ? 'on' : ''}
              />
              <span className={styles.checkmark}>
                <UnionIcon />
              </span>
              프로젝트 새 글 알림
            </label>
          </div>
        </div>
        <Button size="medium" onClick={onSubmit}>
          구독하기
        </Button>
      </section>
    </BasicBubble>
  );
}
