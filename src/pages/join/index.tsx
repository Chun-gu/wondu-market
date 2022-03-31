import Link from 'next/link';
import { Buttons } from '@components';
import { Inputs } from '@components';
import ImageWrapper from '@utils/ImageWrapper';
import Logo from 'public/images/logo.svg';
import { ChangeEvent, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Styled from './styled';

interface JoinInputs {
  joinId: string;
  joinPw: string;
  joinPwConfirm: string;
  name: string;
  phoneNum1: number;
  phoneNum2: number;
  phoneNum3: number;
  emailId: string;
  emailAddress?: string;
}
const onSubmit: SubmitHandler<JoinInputs> = (data) => console.log(data);
const regExpId = /^[A-Za-z0-9]+$/i;
const regExpPw = /^(?=.*[a-zA-Z])((?=.*d)|(?=.*W)).{8,16}$/i;

function Join() {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors }
  } = useForm<JoinInputs>({ mode: 'onChange' });
  const joinPw = useRef('');
  joinPw.current = watch('joinPw');
  // name joinPw element 관찰

  console.log(watch('joinId'));
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.currentTarget.value === 'direct') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };
  return (
    <Styled.Main>
      <Styled.JoinHeader>
        <ImageWrapper width="23.8rem" height="7.4rem">
          <Logo viewBox="0 0 156 38" />
        </ImageWrapper>
      </Styled.JoinHeader>
      <Styled.Container>
        <h1 className="sr-only">회원가입</h1>
        <Styled.Wrap>
          <Inputs.TextInputBox
            width={34}
            hook={register('joinId', {
              required: true,
              minLength: 3,
              maxLength: 15,
              pattern: regExpId
            })}
            placeholder="아이디"
            validationMsg="3~15자의 영문/숫자를 조합하여 입력"
          />
          <Buttons.Custom
            width={12.2}
            height={5.4}
            fontSize={1.8}
            color="green"
            disabled={false}
            type="button"
            onClick={() => {
              trigger('joinId');
            }}
          >
            중복확인
          </Buttons.Custom>
        </Styled.Wrap>
        {/* 에러시 출력칸 */}
        {errors?.joinId?.type === 'required' ? (
          <Styled.ErrorMsg>아이디를 입력해주세요</Styled.ErrorMsg>
        ) : null}
        {errors?.joinId?.type === 'maxLength' ||
        errors?.joinId?.type === 'minLength' ? (
          <Styled.ErrorMsg>입력 가능한 글자수가 틀렸습니다</Styled.ErrorMsg>
        ) : null}
        {errors?.joinId?.type === 'pattern' ? (
          <Styled.ErrorMsg>
            특수문자를 제외한 영어,숫자로 입력해주세요
            {console.log(errors?.joinId)}
          </Styled.ErrorMsg>
        ) : null}
        <Inputs.TextInputBox
          name="joinPw"
          width={48}
          hook={register('joinPw', {
            required: true,
            minLength: 8,
            maxLength: 16,
            pattern: regExpPw
          })}
          option="password"
          placeholder="비밀번호"
          validationMsg="8-16자의 영문/숫자/특수문자를 조합하여 입력"
        />
        {errors?.joinPw?.type === 'required' ? (
          <Styled.ErrorMsg>비밀번호를 입력해주세요</Styled.ErrorMsg>
        ) : null}
        {errors?.joinPw?.type === 'maxLength' ||
        errors?.joinPw?.type === 'minLength' ? (
          <Styled.ErrorMsg>입력 가능한 글자수가 틀렸습니다</Styled.ErrorMsg>
        ) : null}
        <Inputs.TextInputBox
          width={48}
          name="joinPwConfirm"
          option="password"
          placeholder="비밀번호 재확인"
          hook={register('joinPwConfirm', {
            required: true,
            minLength: 8,
            maxLength: 16,
            pattern: regExpPw,
            validate: (v) => v === joinPw.current
          })}
        />{' '}
        {errors?.joinPwConfirm?.type === 'required' ? (
          <Styled.ErrorMsg>비밀번호를 다시 입력해주세요</Styled.ErrorMsg>
        ) : null}
        {errors?.joinPwConfirm?.type === 'maxLength' ||
        errors?.joinPwConfirm?.type === 'minLength' ? (
          <Styled.ErrorMsg>입력 가능한 글자수가 틀렸습니다</Styled.ErrorMsg>
        ) : null}
        {errors.joinPwConfirm && errors.joinPwConfirm.type === 'validate' ? (
          <Styled.ErrorMsg>비밀번호가 일치하지 않습니다</Styled.ErrorMsg>
        ) : null}
        <Inputs.TextInputBox
          width={48}
          placeholder="이름"
          hook={register('name', {
            required: true,
            min: 2,
            pattern: /^[가-힣]+$/i
          })}
        />{' '}
        {errors?.name?.type === 'required' || errors?.name?.type ? (
          <Styled.ErrorMsg>이름을 다시 입력해주세요</Styled.ErrorMsg>
        ) : null}
        <Styled.Wrap>
          <Inputs.TextInputBox
            width={12}
            option="tel"
            placeholder="번호"
            hook={register('phoneNum1', {
              required: true,
              minLength: 3,
              maxLength: 3,
              pattern: /[0-9]+$/i
            })}
          />
          <Styled.P>-</Styled.P>
          <Inputs.TextInputBox
            width={15}
            option="tel"
            hook={register('phoneNum2', {
              required: true,
              maxLength: 4,
              pattern: /[0-9]+$/i
            })}
          />
          <Styled.P>-</Styled.P>
          <Inputs.TextInputBox
            width={15}
            option="tel"
            hook={register('phoneNum3', {
              required: true,
              maxLength: 4,
              pattern: /[0-9]+$/i
            })}
          />{' '}
        </Styled.Wrap>{' '}
        {errors?.phoneNum1 || errors?.phoneNum2 || errors?.phoneNum3 ? (
          <Styled.ErrorMsg>번호를 다시 입력해주세요</Styled.ErrorMsg>
        ) : null}
        <Styled.Wrap>
          <Inputs.TextInputBox
            width={22}
            placeholder="이메일"
            hook={register('emailId', {
              required: true,
              pattern: regExpId
            })}
          />
          <Styled.P>@</Styled.P>
          {/* 상단 select box에서 직접입력 선택 시 나타날 인풋박스 */}
          {isOpen && (
            <Inputs.TextInputBox
              width={14}
              hook={register('emailAddress', {
                required: true,
                pattern: /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
              })}
            />
          )}
          <Styled.Select
            id="emailBox"
            name="emailBox"
            onChange={handleChange}
            isOpen={isOpen}
          >
            <option value="">선택해주세요</option>
            <option value="@gamil.com">gmail.com</option>
            <option value="@hanmail.net">hanmail.net</option>
            <option value="@hotmail.com">hotmail.com</option>
            <option value="nate.com">nate.com</option>
            <option value="@naver.com">naver.com</option>
            <option value="@yahoo.co.kr">yahoo.co.kr</option>
            <option value="direct">직접입력</option>
          </Styled.Select>{' '}
        </Styled.Wrap>{' '}
        {errors?.emailId?.type ? (
          <Styled.ErrorMsg>이메일을 다시 입력해주세요</Styled.ErrorMsg>
        ) : null}
        {errors?.emailAddress?.type ? (
          <Styled.ErrorMsg>이메일 주소를 다시 입력해주세요</Styled.ErrorMsg>
        ) : null}
      </Styled.Container>
      <Styled.JoinHeader>
        <input type="checkbox" />{' '}
        <Styled.ExplainMsg>
          원두마켓의{' '}
          <Link href="/" passHref>
            <Styled.A>이용약관</Styled.A>
          </Link>{' '}
          및{' '}
          <Link href="/" passHref>
            <Styled.A>개인정보처리방침</Styled.A>
          </Link>
          에 대한 내용을 확인하였고 동의합니다.
        </Styled.ExplainMsg>
      </Styled.JoinHeader>
      <Buttons.Custom
        width={48}
        height={6}
        fontSize={1.8}
        color="green"
        disabled={false}
        onClick={handleSubmit(onSubmit)}
      >
        가입하기
      </Buttons.Custom>
    </Styled.Main>
  );
}

export default Join;
